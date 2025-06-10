import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'accedi.dart';
import 'registrati.dart';
import 'profile_page.dart';
import 'map_page.dart';

import 'promemoria_raccolta.dart';
import 'tari.dart';

class EcoTrackHomePage extends StatefulWidget {
  @override
  State<EcoTrackHomePage> createState() => _EcoTrackHomePageState();
}

class _EcoTrackHomePageState extends State<EcoTrackHomePage> {
  bool _notificheAttiveDashboard = true; // Stato delle notifiche nella dashboard
  @override
  void initState() {
    super.initState();
    _checkAndRequestPermissions();
  }

  Future<void> _checkAndRequestPermissions() async {
    final prefs = await SharedPreferences.getInstance();
    final alreadyRequested = prefs.getBool('permissions_requested') ?? false;

    if (!alreadyRequested) {
      await [
        Permission.location,
        Permission.notification,
        Permission.storage,
        Permission.camera,
      ].request();
      await prefs.setBool('permissions_requested', true);
    }
  }

  Widget buildMenuItem(
    IconData icon,
    Color color,
    String title,
    String subtitle,
  ) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 6),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 32),
          SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
                SizedBox(height: 4),
                Text(
                  subtitle,
                  style: TextStyle(color: Colors.black54, fontSize: 13),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        final user = snapshot.data;
        return Scaffold(
          backgroundColor: Color(0xFFF0F2F5),
          body: SafeArea(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Row(
                    children: [
                      SizedBox(width: 8),
                      Text(
                        "EcoTrack",
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.account_circle),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  const ProfilePage(userType: UserType.guest),
                            ),
                          );
                        },
                      ),
                      IconButton(
                        icon: Icon(Icons.settings, color: Colors.black87),
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Impostazioni (prossimamente)')),
                          );
                        },
                      ),
                    ],
                  ),
                  SizedBox(height: 24),
                  // MENU PRINCIPALE
                  GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(builder: (context) => const MapPage()),
                      );
                    },
                    child: buildMenuItem(
                      Icons.map,
                      Colors.green,
                      "Mappa Interattiva",
                      "Visualizza i cassonetti e il livello di riempimento.",
                    ),
                  ),
                  GestureDetector(
                    onTap: () async {
                      final result = await Navigator.of(context).push<bool>(
                        MaterialPageRoute(
                          builder: (context) => PromemoriaRaccoltaPage(
                            notificheAttive: _notificheAttiveDashboard,
                          ),
                        ),
                      );
                      if (result != null) {
                        setState(() {
                          _notificheAttiveDashboard = result;
                        });
                      }
                    },
                    child: buildMenuItem(
                      Icons.notifications,
                      Colors.blue,
                      "Promemoria Raccolta",
                      "Ricevi notifiche per la raccolta porta a porta.",
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      // TODO: Navigazione a pagina segnalazioni
                    },
                    child: buildMenuItem(
                      Icons.camera_alt,
                      Colors.red,
                      "Segnalazioni",
                      "Segnala aree inquinate con foto.",
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      // TODO: Navigazione a pagina prenotazione smaltimento
                    },
                    child: buildMenuItem(
                      Icons.calendar_today,
                      Colors.amber[800]!,
                      "Prenota Smaltimento",
                      "Prenota lo smaltimento presso un ecocentro.",
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(builder: (context) => const TariPage()),
                      );
                    },
                    child: buildMenuItem(
                      Icons.attach_money,
                      Colors.purple,
                      "Simula Tasse",
                      "Calcola le tasse sulla gestione dei rifiuti.",
                    ),
                  ),
                  const Spacer(),
                  // PULSANTI DI AUTENTICAZIONE
                  ElevatedButton(
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(builder: (context) => const AccediPage()),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size(double.infinity, 50),
                      backgroundColor: Colors.green,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 6,
                      shadowColor: Colors.greenAccent,
                      padding: EdgeInsets.symmetric(vertical: 14),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.login, color: Colors.white, size: 26),
                        SizedBox(width: 10),
                        Text(
                          "Accedi",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                            letterSpacing: 1.1,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: user == null
                        ? () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (context) => const RegistratiPage(),
                              ),
                            );
                          }
                        : null,
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: Colors.green.shade700,
                      minimumSize: Size(double.infinity, 50),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 6,
                      shadowColor: Colors.greenAccent,
                      padding: EdgeInsets.symmetric(vertical: 14),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.person_add, color: Colors.white, size: 26),
                        SizedBox(width: 10),
                        Text(
                          "Registrati",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                            letterSpacing: 1.1,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: user != null
                        ? () async {
                            await FirebaseAuth.instance.signOut();
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Logout effettuato')),
                            );
                          }
                        : null,
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: Colors.red,
                      minimumSize: Size(double.infinity, 50),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 6,
                      shadowColor: Colors.redAccent,
                      padding: EdgeInsets.symmetric(vertical: 14),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.logout, color: Colors.white, size: 26),
                        SizedBox(width: 10),
                        Text(
                          "Esci",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                            letterSpacing: 1.1,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
