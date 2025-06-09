import 'package:flutter/material.dart';

enum MetodoTari { classico, nordico }

class TariPage extends StatefulWidget {
  const TariPage({Key? key}) : super(key: key);

  @override
  State<TariPage> createState() => _TariPageState();
}

class _TariPageState extends State<TariPage> {
  final _formKey = GlobalKey<FormState>();
  MetodoTari? _metodo = MetodoTari.classico;

  final _areaCtrl = TextEditingController();
  final _componentiCtrl = TextEditingController();
  final _tariffaKgCtrl = TextEditingController();
  final _pesoManualeCtrl = TextEditingController();

  double? _risultato;
  int? _componentiUsati;
  double? _pesoStimatoUsato;

  @override
  void dispose() {
    _areaCtrl.dispose();
    _componentiCtrl.dispose();
    _tariffaKgCtrl.dispose();
    _pesoManualeCtrl.dispose();
    super.dispose();
  }

  int _componentiDaSuperficie(double superficie) {
    if (superficie <= 45) return 1;
    if (superficie <= 60) return 2;
    if (superficie <= 75) return 3;
    return 4;
  }

  double _tariffaFissa(int componenti) {
    switch (componenti) {
      case 1: return 0.7234;
      case 2: return 0.8499;
      case 3: return 0.9491;
      case 4: return 1.0306;
      case 5: return 1.1119;
      default: return 1.1752;
    }
  }

  double _quotaVariabileServizi(int componenti) {
    switch (componenti) {
      case 1: return 24.0460;
      case 2: return 43.2838;
      case 3: return 55.2792;
      case 4: return 72.1309;
      case 5: return 86.5563;
      default: return 98.5780;
    }
  }

  double _pesoStimato(int componenti) {
    switch (componenti) {
      case 1: return 500;
      case 2: return 900;
      case 3: return 1200;
      case 4: return 1500;
      case 5: return 1800;
      default: return 2100;
    }
  }

  void _calcola() {
    if (!_formKey.currentState!.validate()) return;

    double res;

    if (_metodo == MetodoTari.classico) {
      final superficie = double.parse(_areaCtrl.text);
      final compText = _componentiCtrl.text.trim();
      final componenti = compText.isNotEmpty ? int.tryParse(compText) ?? 1 : _componentiDaSuperficie(superficie);
      final peso = _pesoStimato(componenti);

      final quotaFissa = superficie * _tariffaFissa(componenti);
      final quotaServizi = _quotaVariabileServizi(componenti);
      final quotaMisurata = peso * 1.0024;

      res = quotaFissa + quotaServizi + quotaMisurata;

      setState(() {
        _risultato = res;
        _componentiUsati = componenti;
        _pesoStimatoUsato = peso;
      });
    } else {
      final peso = double.parse(_pesoManualeCtrl.text);
      final tariffa = double.parse(_tariffaKgCtrl.text);
      res = peso * tariffa;

      setState(() {
        _risultato = res;
        _componentiUsati = null;
        _pesoStimatoUsato = null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Calcolo TARI')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              DropdownButtonFormField<MetodoTari>(
                value: _metodo,
                decoration: const InputDecoration(labelText: 'Metodo di calcolo'),
                items: const [
                  DropdownMenuItem(
                    value: MetodoTari.classico,
                    child: Text('Classico (€/mq + servizi + stimato)'),
                  ),
                  DropdownMenuItem(
                    value: MetodoTari.nordico,
                    child: Text('Nordico (€/kg manuale)'),
                  ),
                ],
                onChanged: (m) {
                  setState(() {
                    _metodo = m;
                    _risultato = null;
                  });
                },
              ),
              const SizedBox(height: 16),
              if (_metodo == MetodoTari.classico) ...[
                TextFormField(
                  controller: _areaCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Superficie dell\'abitazione (mq)'),
                  validator: (v) => (v == null || v.isEmpty) ? 'Obbligatorio' : null,
                ),
                TextFormField(
                  controller: _componentiCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Numero componenti (facoltativo)'),
                ),
              ] else ...[
                TextFormField(
                  controller: _pesoManualeCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Rifiuti prodotti (kg)'),
                  validator: (v) => (v == null || v.isEmpty) ? 'Obbligatorio' : null,
                ),
                TextFormField(
                  controller: _tariffaKgCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Tariffa (€ per kg)'),
                  validator: (v) => (v == null || v.isEmpty) ? 'Obbligatorio' : null,
                ),
              ],
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _calcola,
                child: const Text('Calcola TARI'),
              ),
              const SizedBox(height: 24),
              if (_risultato != null) ...[
                Text(
                  'Importo TARI: € ${_risultato!.toStringAsFixed(2)}',
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                if (_componentiUsati != null && _pesoStimatoUsato != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Text(
                      'Componenti considerati: $_componentiUsati\n'
                      'Rifiuti stimati: ${_pesoStimatoUsato!.toStringAsFixed(0)} kg/anno',
                      style: const TextStyle(fontSize: 14, color: Colors.grey),
                    ),
                  ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
