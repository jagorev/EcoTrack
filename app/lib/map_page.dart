import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;

class MapPage extends StatefulWidget {
  const MapPage({super.key});
  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  final Set<Marker> _markers = {};
  bool _loading = true;
  bool _iconsLoaded = false;
  late GoogleMapController _mapController;

  late BitmapDescriptor greenIcon;
  late BitmapDescriptor orangeIcon;
  late BitmapDescriptor redIcon;
  late BitmapDescriptor ecocentroIcon;

  static const _initialPosition = CameraPosition(
    target: LatLng(46.0711, 11.1217),
    zoom: 13,
  );

  @override
  void initState() {
    super.initState();
    _loadIcons().then((_) => _loadPins());
  }

  Future<void> _loadIcons() async {
    try {
      greenIcon = await BitmapDescriptor.fromAssetImage(
        const ImageConfiguration(size: Size(48, 48)),
        'assets/unita_marker_green.png',
      );
      orangeIcon = await BitmapDescriptor.fromAssetImage(
        const ImageConfiguration(size: Size(48, 48)),
        'assets/unita_marker_orange.png',
      );
      redIcon = await BitmapDescriptor.fromAssetImage(
        const ImageConfiguration(size: Size(48, 48)),
        'assets/unita_marker_red.png',
      );
      ecocentroIcon = await BitmapDescriptor.fromAssetImage(
        const ImageConfiguration(size: Size(48, 48)),
        'assets/ecocentro_marker.png',
      );
      setState(() {
        _iconsLoaded = true;
      });
    } catch (e) {
      debugPrint('Errore caricamento icone: $e');
    }
  }

  BitmapDescriptor getIcon(num livello) {
    if (livello < 40) return greenIcon;
    if (livello < 80) return orangeIcon;
    return redIcon;
  }

  Future<void> _loadPins() async {
    const unitaApi = 'http://10.0.2.2:3000/api/unitaRaccolta';
    const ecocentroApi = 'http://10.0.2.2:3000/api/ecocentro';

    try {
      // Carica unità di raccolta
      final resp = await http.get(Uri.parse(unitaApi));
      final markers = <Marker>{};
      if (resp.statusCode == 200) {
        final List data = json.decode(resp.body);
        for (var item in data) {
          final p = item['posizione'];
          if (p == null) continue;
          double toDec(int g, int m, double s) =>
              (g.sign >= 0 ? 1 : -1) * (g.abs() + m / 60 + s / 3600);
          final lat = toDec(
            p['latitudineGradi'],
            p['latitudinePrimi'],
            p['latitudineSecondi'].toDouble(),
          );
          final lng = toDec(
            p['longitudineGradi'],
            p['longitudinePrimi'],
            p['longitudineSecondi'].toDouble(),
          );
          final livello = item['livelloSaturazione'] ?? 0;
          markers.add(
            Marker(
              markerId: MarkerId(item['_id']),
              position: LatLng(lat, lng),
              icon: getIcon(livello),
              infoWindow: InfoWindow(
                title: 'Saturazione: $livello%',
                snippet: 'Capienza: ${item['capienza']}',
              ),
            ),
          );
        }
      }

      // Carica ecocentri
      final ecoResp = await http.get(Uri.parse(ecocentroApi));
      if (ecoResp.statusCode == 200) {
        final List ecoData = json.decode(ecoResp.body);
        for (var item in ecoData) {
          final p = item['posizione'];
          if (p == null) continue;
          double toDec(int g, int m, double s) =>
              (g.sign >= 0 ? 1 : -1) * (g.abs() + m / 60 + s / 3600);
          final lat = toDec(
            p['latitudineGradi'],
            p['latitudinePrimi'],
            p['latitudineSecondi'].toDouble(),
          );
          final lng = toDec(
            p['longitudineGradi'],
            p['longitudinePrimi'],
            p['longitudineSecondi'].toDouble(),
          );
          markers.add(
            Marker(
              markerId: MarkerId('ecocentro_${item['_id']}'),
              position: LatLng(lat, lng),
              icon: ecocentroIcon,
              infoWindow: InfoWindow(
                title: item['nome'] ?? 'Ecocentro',
                snippet: item['indirizzo'] ?? '',
              ),
            ),
          );
        }
      }

      setState(() {
        _markers.clear();
        _markers.addAll(markers);
        _loading = false;
      });
    } catch (e) {
      debugPrint('Eccezione in _loadPins: $e');
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading || !_iconsLoaded) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }
    return Scaffold(
      appBar: AppBar(title: const Text('EcoTrack Map')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey, width: 2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: GoogleMap(
              initialCameraPosition: _initialPosition,
              onMapCreated: (c) => _mapController = c,
              markers: _markers,
            ),
          ),
        ),
      ),
    );
  }
}
