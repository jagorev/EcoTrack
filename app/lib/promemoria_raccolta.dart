import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class PromemoriaRaccoltaPage extends StatefulWidget {
  const PromemoriaRaccoltaPage({Key? key, this.notificheAttive}) : super(key: key);

  final bool? notificheAttive;

  @override
  State<PromemoriaRaccoltaPage> createState() => _PromemoriaRaccoltaPageState();
}

class _PromemoriaRaccoltaPageState extends State<PromemoriaRaccoltaPage> {
  late bool notificheAttive;
  List<String> notifichePrecedenti = [];
  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
  List<String> _lastNotifiche = [];

  @override
  void initState() {
    super.initState();
    notificheAttive = widget.notificheAttive ?? true;
    _initNotifications();
    fetchNotifiche();
  }

  Future<void> _initNotifications() async {
    const AndroidInitializationSettings initializationSettingsAndroid = AndroidInitializationSettings('@mipmap/ic_launcher');
    const InitializationSettings initializationSettings = InitializationSettings(android: initializationSettingsAndroid);
    await flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  Future<void> _showNotification(String corpo) async {
    const AndroidNotificationDetails androidPlatformChannelSpecifics = AndroidNotificationDetails(
      'promemoria_channel',
      'Promemoria Raccolta',
      channelDescription: 'Notifiche promemoria raccolta rifiuti',
      importance: Importance.max,
      priority: Priority.high,
      ticker: 'ticker',
    );
    const NotificationDetails platformChannelSpecifics = NotificationDetails(android: androidPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.show(
      0,
      'Nuovo promemoria raccolta',
      corpo,
      platformChannelSpecifics,
    );
  }

  Future<void> fetchNotifiche() async {
    try {
      final response = await http.get(Uri.parse('http://10.0.2.2:3000/api/notifiche'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        final List<String> nuoveNotifiche = data.map((n) => n['corpoNotifica'] as String).toList();
        if (notificheAttive && _lastNotifiche.isNotEmpty && nuoveNotifiche.isNotEmpty) {
          final nuova = nuoveNotifiche.firstWhere((n) => !_lastNotifiche.contains(n), orElse: () => '');
          if (nuova.isNotEmpty) {
            _showNotification(nuova);
          }
        }
        setState(() {
          notifichePrecedenti = nuoveNotifiche;
          _lastNotifiche = nuoveNotifiche;
        });
      } else {
        setState(() {
          notifichePrecedenti = ['Errore nel recupero delle notifiche'];
        });
      }
    } catch (e) {
      setState(() {
        notifichePrecedenti = ['Errore di rete'];
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Promemoria Raccolta'),
        backgroundColor: Colors.green,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.of(context).pop(notificheAttive);
          },
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  Switch(
                    value: notificheAttive,
                    onChanged: (val) {
                      setState(() {
                        notificheAttive = val;
                      });
                    },
                    activeColor: Colors.green,
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'Attiva notifiche promemoria raccolta rifiuti',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Notifiche precedenti:',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: notifichePrecedenti.isEmpty
                    ? const Text('Nessuna notifica precedente.')
                    : ListView.builder(
                        itemCount: notifichePrecedenti.length,
                        itemBuilder: (context, index) => Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4.0),
                          child: Text(
                            notifichePrecedenti[index],
                            style: const TextStyle(fontSize: 15),
                          ),
                        ),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
