import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;

class MapPage extends StatefulWidget {
  const MapPage({ super.key });
  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  final Set<Marker> _markers = {};
  bool _loading = true;
  late GoogleMapController _mapController;

  static const _initialPosition = CameraPosition(
    target: LatLng(46.0711, 11.1217),
    zoom: 13,
  );

  @override
  void initState() {
    super.initState();
    _loadPins();
  }

  Future<void> _loadPins() async {
    const api = 'http://10.0.2.2:3000/api/unitaRaccolta'; // <- Android emulator address
    try {
      final resp = await http.get(Uri.parse(api));
      if (resp.statusCode == 200) {
        final List data = json.decode(resp.body);
        final markers = <Marker>{};
        for (var item in data) {
          final p = item['posizione'];
          double toDec(int g, int m, double s) =>
              (g.sign >= 0 ? 1 : -1) * (g.abs() + m / 60 + s / 3600);
          final lat = toDec(p['latitudineGradi'], p['latitudinePrimi'], p['latitudineSecondi'].toDouble());
          final lng = toDec(p['longitudineGradi'], p['longitudinePrimi'], p['longitudineSecondi'].toDouble());
          markers.add(Marker(
            markerId: MarkerId(item['_id']),
            position: LatLng(lat, lng),
          ));
        }
        setState(() {
          _markers.clear();
          _markers.addAll(markers);
          _loading = false;
        });
      } else {
        debugPrint('Errore ${resp.statusCode}');
        setState(() => _loading = false);
      }
    } catch (e) {
      debugPrint('Eccezione in _loadPins: $e');
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }
    return Scaffold(
      appBar: AppBar(title: const Text('EcoTrack Map')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: Colors.grey,
              width: 2,
            ),
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

