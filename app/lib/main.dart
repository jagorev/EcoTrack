import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({ super.key });
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: TariCalculatorPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

enum MetodoTari { classico, nordico }

class TariCalculatorPage extends StatefulWidget {
  const TariCalculatorPage({ super.key });
  @override
  State<TariCalculatorPage> createState() => _TariCalculatorPageState();
}

class _TariCalculatorPageState extends State<TariCalculatorPage> {
  final _formKey = GlobalKey<FormState>();
  MetodoTari? _metodo = MetodoTari.classico;

  // controllers per i campi
  final _areaCtrl = TextEditingController();
  final _tariffaCtrl = TextEditingController();
  final _volumeCtrl = TextEditingController();
  final _tariffaKgCtrl = TextEditingController();

  double? _risultato;

  @override
  void dispose() {
    _areaCtrl.dispose();
    _tariffaCtrl.dispose();
    _volumeCtrl.dispose();
    _tariffaKgCtrl.dispose();
    super.dispose();
  }

  void _calcola() {
    if (!_formKey.currentState!.validate()) return;

    double res;
    if (_metodo == MetodoTari.classico) {
      final area = double.parse(_areaCtrl.text);
      final t = double.parse(_tariffaCtrl.text);
      // esempio: tariffa €/mq
      res = area * t;
    } else {
      final vol = double.parse(_volumeCtrl.text);
      final tkg = double.parse(_tariffaKgCtrl.text);
      // esempio: tariffa €/kg di rifiuti
      res = vol * tkg;
    }

    setState(() => _risultato = res);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Calcolo TARI')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              // selezione del metodo
              DropdownButtonFormField<MetodoTari>(
                value: _metodo,
                decoration: const InputDecoration(labelText: 'Metodo di calcolo'),
                items: const [
                  DropdownMenuItem(
                    value: MetodoTari.classico,
                    child: Text('Classico (€/mq)'),
                  ),
                  DropdownMenuItem(
                    value: MetodoTari.nordico,
                    child: Text('Nordico (€/kg)'),
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

              // campi dinamici
              if (_metodo == MetodoTari.classico) ...[
                TextFormField(
                  controller: _areaCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Superficie (mq)',
                  ),
                  validator: (v) => (v==null||v.isEmpty) ? 'Obbligatorio' : null,
                ),
                TextFormField(
                  controller: _tariffaCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Tariffa (€ per mq)',
                  ),
                  validator: (v) => (v==null||v.isEmpty) ? 'Obbligatorio' : null,
                ),
              ] else ...[
                TextFormField(
                  controller: _volumeCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Rifiuti prodotti (kg)',
                  ),
                  validator: (v) => (v==null||v.isEmpty) ? 'Obbligatorio' : null,
                ),
                TextFormField(
                  controller: _tariffaKgCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Tariffa (€ per kg)',
                  ),
                  validator: (v) => (v==null||v.isEmpty) ? 'Obbligatorio' : null,
                ),
              ],

              const SizedBox(height: 24),

              ElevatedButton(
                onPressed: _calcola,
                child: const Text('Calcola TARI'),
              ),

              const SizedBox(height: 24),
              if (_risultato != null)
                Text(
                  'Importo TARI: € ${_risultato!.toStringAsFixed(2)}',
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
