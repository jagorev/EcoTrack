import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'signInWithGoogle.dart';
import 'package:sign_in_button/sign_in_button.dart';

class AccediPage extends StatefulWidget {
  const AccediPage({Key? key}) : super(key: key);

  @override
  State<AccediPage> createState() => _AccediPageState();
}

class _AccediPageState extends State<AccediPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String? displayName;

  Future<void> _signInWithEmail() async {
    try {
      final userCredential = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: usernameController.text.trim(),
        password: passwordController.text.trim(),
      );
      setState(() {
        displayName = userCredential.user?.displayName 
            ?? userCredential.user?.email 
            ?? 'Utente';
      });
      // naviga alla home o mostra messaggio di successo
    } catch (e) {
      print('Errore login con email: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Credenziali non valide')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Accedi'),
        backgroundColor: Colors.green,
        actions: [
          if (displayName != null)
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: Center(
                child: Text(
                  displayName!,
                  style: const TextStyle(fontSize: 16, color: Colors.white),
                ),
              ),
            ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: usernameController,
              decoration: const InputDecoration(
                labelText: 'Nome utente',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 30),
            // Pulsante "Accedi" personalizzato con logo EcoTrack
            GestureDetector(
              onTap: _signInWithEmail,
              child: Container(
                width: double.infinity,
                height: 50,
                decoration: BoxDecoration(
                  color: Colors.white, // Sfondo bianco
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.grey.shade300),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black12,
                      blurRadius: 2,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset(
                      'assets/logo_ecotrack.png',
                      height: 28,
                      width: 28,
                    ),
                    const SizedBox(width: 16),
                    const Text(
                      'Accedi',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black87,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),
            SignInButton(
              Buttons.google,
              text: "Accedi con Google",
              onPressed: () async {
                try {
                  final userCredential = await AuthService.signInWithGoogle();
                  setState(() {
                    displayName = userCredential.user?.displayName
                        ?? userCredential.user?.email
                        ?? 'Utente';
                  });
                  // naviga alla home o mostra messaggio di successo
                } catch (e) {
                  print('Errore login con Google: $e');
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
