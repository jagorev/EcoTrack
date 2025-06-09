import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

enum UserType { guest, registered, operator }

class ProfilePage extends StatefulWidget {
  final UserType userType;
  const ProfilePage({super.key, required this.userType});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _phoneController = TextEditingController();
  final _zonaOperativaController = TextEditingController();
  final _idBadgeController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _phoneController.dispose();
    _zonaOperativaController.dispose();
    _idBadgeController.dispose();
    super.dispose();
  }

  void _onRegister() async {
    if (_formKey.currentState?.validate() ?? false) {
      final url = Uri.parse('http://10.0.2.2:3000/api/utenteRegistrato');
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': _nameController.text,
          'email': _emailController.text,
          'telefono': _phoneController.text,
          'password': _passwordController.text,
        }),
      );
      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Registrazione effettuata!')),
        );
      } else {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Errore: ${response.body}')));
      }
    }
  }

  void _onSave() async {
    if (_formKey.currentState?.validate() ?? false) {
      // Scegli endpoint e body in base al tipo utente
      String endpoint;
      Map<String, dynamic> body = {
        'nome': _nameController.text,
        'email': _emailController.text,
        'telefono': _phoneController.text,
      };
      if (_passwordController.text.isNotEmpty) {
        body['password'] = _passwordController.text;
      }
      if (widget.userType == UserType.operator) {
        const String idOperatore = '682b0d198d5ed5ad49091674';
        endpoint = 'http://10.0.2.2:3000/api/operatoriEcologici/$idOperatore';
        body['zonaOperativa'] = _zonaOperativaController.text;
        body['idBadge'] = _idBadgeController.text;
      } else {
        const String idUtenteRegistrato = '681b8364d1e11c5d634eb4b7';
        endpoint =
            'http://10.0.2.2:3000/api/utenteRegistrato/$idUtenteRegistrato';
      }

      final response = await http.put(
        Uri.parse(endpoint),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(body),
      );
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Profilo salvato!')));
      } else {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Errore: ${response.body}')));
      }
    }
  }

  Widget _inputField(
    TextEditingController controller,
    String label, {
    bool obscure = false,
    String? Function(String?)? validator,
  }) => Padding(
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
    List<Widget> fields = [];
    String title = '';
    VoidCallback? onPressed;
    switch (widget.userType) {
      case UserType.guest:
        title = 'Registrazione';
        fields = [
          const Text(
            'Crea un nuovo account',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 24),
          _inputField(
            _nameController,
            'Nome completo',
            validator:
                (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _emailController,
            'Email',
            validator:
                (v) =>
                    v == null || !v.contains('@') ? 'Email non valida' : null,
          ),
          _inputField(
            _phoneController,
            'Telefono',
            validator:
                (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _passwordController,
            'Password',
            obscure: true,
            validator:
                (v) => v == null || v.length < 6 ? 'Minimo 6 caratteri' : null,
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
            _nameController,
            'Nome completo',
            validator:
                (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _emailController,
            'Email',
            validator:
                (v) =>
                    v == null || !v.contains('@') ? 'Email non valida' : null,
          ),
          _inputField(_phoneController, 'Telefono'),
          _inputField(
            _passwordController,
            'Nuova password (opzionale)',
            obscure: true,
          ),
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
            _nameController,
            'Nome completo',
            validator:
                (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _emailController,
            'Email',
            validator:
                (v) =>
                    v == null || !v.contains('@') ? 'Email non valida' : null,
          ),
          _inputField(_phoneController, 'Telefono'),
          _inputField(
            _zonaOperativaController,
            'Zona operativa',
            validator:
                (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _idBadgeController,
            'ID Badge',
            validator:
                (v) => v == null || v.isEmpty ? 'Campo obbligatorio' : null,
          ),
          _inputField(
            _passwordController,
            'Nuova password (opzionale)',
            obscure: true,
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
