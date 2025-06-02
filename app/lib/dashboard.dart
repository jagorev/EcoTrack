import 'package:flutter/material.dart';
import 'accedi.dart';
import 'registrati.dart';
import 'profile_page.dart';
import 'map_page.dart';
import 'promemoria_raccolta.dart';

class EcoTrackHomePage extends StatefulWidget {
  const EcoTrackHomePage({Key? key}) : super(key: key);

  @override
  State<EcoTrackHomePage> createState() => _EcoTrackHomePageState();
}

class _EcoTrackHomePageState extends State<EcoTrackHomePage> {
  bool _notificheAttiveDashboard = true; // Stato delle notifiche nella dashboard

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
                          builder:
                              (context) =>
                                  const ProfilePage(userType: UserType.guest),
                        ),
                      );
                    },
                  ),
                  IconButton(
                    icon: Icon(Icons.settings, color: Colors.black87),
                    onPressed: () {
                      // TODO: Azione impostazioni
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Impostazioni (prossimamente)')),
                      );
                    },
                  ),
                ],
              ),
              SizedBox(height: 24),
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
              buildMenuItem(
                Icons.camera_alt,
                Colors.red,
                "Segnalazioni",
                "Segnala aree inquinate con foto.",
              ),
              buildMenuItem(
                Icons.calendar_today,
                Colors.amber[800]!,
                "Prenota Smaltimento",
                "Prenota lo smaltimento presso un ecocentro.",
              ),
              buildMenuItem(
                Icons.attach_money,
                Colors.purple,
                "Simula Tasse",
                "Calcola le tasse sulla gestione dei rifiuti.",
              ),
              Spacer(),
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
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => const RegistratiPage(),
                    ),
                  );
                },
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
            ],
          ),
        ),
      ),
    );
  }
}
