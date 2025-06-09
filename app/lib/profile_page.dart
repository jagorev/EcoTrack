import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:firebase_auth/firebase_auth.dart';

enum UserType { guest, registered, operator }

class ProfilePage extends StatefulWidget {
  final UserType userType;
  const ProfilePage({Key? key, required this.userType}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _phoneController = TextEditingController();
  final _zonaOperativaController = TextEditingController();
  final _idLavorativoController = TextEditingController();

  @override
  void dispose() {
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _phoneController.dispose();
    _zonaOperativaController.dispose();
    _idLavorativoController.dispose();
    super.dispose();
  }

  void _onRegister() async {
    if (_formKey.currentState?.validate() ?? false) {
      final url = Uri.parse('http://10.0.2.2:3000/api/utenteRegistrato');
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': _usernameController.text.trim(),
          'email': _emailController.text.trim(),
          'telefono': _phoneController.text.trim(),
        }),
      );
      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Registrazione effettuata!')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Errore: ${response.body}')),
        );
      }
    }
  }

  void _onSave() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Devi essere autenticato per modificare il profilo.')),
      );
      return;
    }

    if (_formKey.currentState?.validate() ?? false) {
      String endpoint;
      Map<String, dynamic> body = {};
      if (widget.userType == UserType.operator) {
        endpoint = 'http://10.0.2.2:3000/api/operatoriEcologici/${user.uid}';
        body = {
          'username': _usernameController.text.trim(),
          'email': _emailController.text.trim(),
          'telefono': _phoneController.text.trim(),
          'id_lavorativo': _idLavorativoController.text.trim(),
          'zona': _zonaOperativaController.text.trim(),
        };
      } else {
        endpoint = 'http://10.0.2.2:3000/api/utenteRegistrato/${user.uid}';
        body = {
          'username': _usernameController.text.trim(),
          'email': _emailController.text.trim(),
          'telefono': _phoneController.text.trim(),
        };
      }

      // Ottieni il token Firebase
      final idToken = await user.getIdToken();

      final response = await http.put(
        Uri.parse(endpoint),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $idToken', // <-- aggiungi il token qui
        },
        body: jsonEncode(body),
      );
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Profilo salvato!')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Errore: ${response.body}')),
        );
      }
    }
  }

  Widget _inputField(
    TextEditingController controller,
    String label, {
    bool obscure = false,
    String? Function(String?)? validator,
  }) =>
      Padding(
        padding: const EdgeInsets.only(bottom: 16),
        child: TextFormField(
          controller: controller,
          obscureText: obscure,
          decoration: InputDecoration(
            labelText: label,
            border: const OutlineInputBorder(),
          ),
          validator: validator,
        ),
      );

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;
    final isLogged = user != null;

    // Scegli il tipo di form da mostrare
    final effectiveUserType = isLogged
        ? (widget.userType == UserType.operator ? UserType.operator : UserType.registered)
        : UserType.guest;

    // Blocca la modifica se non autenticato e non guest
    if ((effectiveUserType == UserType.registered || effectiveUserType == UserType.operator) && user == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Profilo')),
        body: const Center(
          child: Text(
            'Devi essere autenticato per modificare il profilo.',
            style: TextStyle(fontSize: 18, color: Colors.red),
            textAlign: TextAlign.center,
          ),
        ),
      );
    }

    List<Widget> fields = [];
    String title = '';
    VoidCallback? onPressed;
    switch (effectiveUserType) {
      case UserType.guest:
        title = 'Registrazione';
        fields = [
          const Text(
            'Crea un nuovo account',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 24),
          _inputField(
            _usernameController,
            'Username',
            validator: (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _emailController,
            'Email',
            validator: (v) => v == null || !v.contains('@') ? 'Email non valida' : null,
          ),
          _inputField(
            _phoneController,
            'Telefono',
            validator: (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _passwordController,
            'Password',
            obscure: true,
            validator: (v) => v == null || v.length < 6 ? 'Minimo 6 caratteri' : null,
          ),
          ElevatedButton(
            onPressed: _onRegister,
            child: const Text('Registrati'),
          ),
        ];
        break;
      case UserType.registered:
        title = 'Profilo Utente';
        fields = [
          const Text(
            'Modifica il tuo profilo',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 24),
          _inputField(
            _usernameController,
            'Username',
            validator: (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _emailController,
            'Email',
            validator: (v) => v == null || !v.contains('@') ? 'Email non valida' : null,
          ),
          _inputField(_phoneController, 'Telefono'),
          ElevatedButton(
            onPressed: _onSave,
            child: const Text('Salva modifiche'),
          ),
        ];
        break;
      case UserType.operator:
        title = 'Profilo Operatore Ecologico';
        fields = [
          const Text(
            'Modifica profilo operatore',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 24),
          _inputField(
            _usernameController,
            'Username',
            validator: (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _emailController,
            'Email',
            validator: (v) => v == null || !v.contains('@') ? 'Email non valida' : null,
          ),
          _inputField(_phoneController, 'Telefono'),
          _inputField(
            _zonaOperativaController,
            'Zona operativa',
            validator: (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _idLavorativoController,
            'ID Lavorativo',
            validator: (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          ElevatedButton(
            onPressed: _onSave,
            child: const Text('Salva modifiche'),
          ),
        ];
        break;
    }
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(key: _formKey, child: ListView(children: fields)),
      ),
    );
  }
}
