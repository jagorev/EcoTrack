import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'dart:async';

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
  late Timer _pollingTimer;
  List<Map<String, dynamic>> notificheOrdinate = [];

  @override
  void initState() {
    super.initState();
    notificheAttive = widget.notificheAttive ?? true;
    _initNotifications();
    fetchNotifiche();
    // Poll for new notifications every 30 seconds
    _pollingTimer = Timer.periodic(const Duration(seconds: 30), (timer) {
      fetchNotifiche();
    });
  }

  Future<void> _initNotifications() async {
    const AndroidInitializationSettings initializationSettingsAndroid = AndroidInitializationSettings('@mipmap/ic_launcher');
    final DarwinInitializationSettings initializationSettingsIOS = DarwinInitializationSettings();
    final InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );
    await flutterLocalNotificationsPlugin.initialize(initializationSettings);
    // Request notification permission on Android 13+
    if (Platform.isAndroid) {
      // Android 13+ (API 33) requires POST_NOTIFICATIONS permission
      // Use flutter_local_notifications built-in requestPermissions for iOS, but Android handled by manifest
    }
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
        // Ordina per dataInvio crescente (più imminente in alto)
        data.sort((a, b) => DateTime.parse(a['dataInvio']).compareTo(DateTime.parse(b['dataInvio'])));
        notificheOrdinate = data.map((n) => {
          'corpoNotifica': n['corpoNotifica'],
          'dataInvio': n['dataInvio'],
        }).toList();
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
  void dispose() {
    _pollingTimer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF6FFF7),
      appBar: AppBar(
        elevation: 0,
        backgroundColor: const Color(0xFF16a34a),
        title: Row(
          children: [
            const Icon(Icons.notifications_active, color: Colors.white, size: 28),
            const SizedBox(width: 10),
            const Text('Promemoria Raccolta', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22)),
          ],
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.of(context).pop(notificheAttive);
          },
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(18.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 18),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [BoxShadow(color: Colors.green.withOpacity(0.08), blurRadius: 8, offset: const Offset(0, 2))],
              ),
              child: Row(
                children: [
                  Switch(
                    value: notificheAttive,
                    onChanged: (val) {
                      setState(() {
                        notificheAttive = val;
                      });
                    },
                    activeColor: const Color(0xFF16a34a),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      notificheAttive ? 'Notifiche attive: riceverai promemoria raccolta' : 'Notifiche disattivate',
                      style: TextStyle(
                        color: notificheAttive ? const Color(0xFF16a34a) : Colors.grey,
                        fontWeight: FontWeight.w600,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 28),
            const Text(
              'Prossimi promemoria:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF16a34a)),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: notificheOrdinate.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const [
                          Icon(Icons.inbox, size: 60, color: Colors.green),
                          SizedBox(height: 10),
                          Text('Nessun promemoria programmato', style: TextStyle(fontSize: 16, color: Colors.grey)),
                        ],
                      ),
                    )
                  : ListView.builder(
                      itemCount: notificheOrdinate.length,
                      itemBuilder: (context, index) {
                        final notifica = notificheOrdinate[index];
                        final data = DateTime.parse(notifica['dataInvio']);
                        final oggi = DateTime.now();
                        final isOggi = data.year == oggi.year && data.month == oggi.month && data.day == oggi.day;
                        return AnimatedContainer(
                          duration: const Duration(milliseconds: 400),
                          curve: Curves.easeIn,
                          margin: const EdgeInsets.symmetric(vertical: 7),
                          child: Card(
                            elevation: 2,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            color: isOggi ? const Color(0xFFdcfce7) : Colors.white,
                            child: ListTile(
                              leading: CircleAvatar(
                                backgroundColor: isOggi ? const Color(0xFF16a34a) : Colors.green[200],
                                child: Icon(
                                  isOggi ? Icons.today : Icons.event,
                                  color: Colors.white,
                                ),
                              ),
                              title: Text(
                                notifica['corpoNotifica'],
                                style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 16),
                              ),
                              subtitle: Row(
                                children: [
                                  Icon(Icons.calendar_today, size: 16, color: Colors.green[700]),
                                  const SizedBox(width: 4),
                                  Text(
                                    '${data.day.toString().padLeft(2, '0')}/${data.month.toString().padLeft(2, '0')}/${data.year}',
                                    style: TextStyle(
                                      color: isOggi ? const Color(0xFF16a34a) : Colors.green[700],
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                  if (isOggi)
                                    Container(
                                      margin: const EdgeInsets.only(left: 8),
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF16a34a),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: const Text('OGGI', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
                                    ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
