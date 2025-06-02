import 'package:flutter/material.dart';

class PromemoriaRaccoltaPage extends StatefulWidget {
  const PromemoriaRaccoltaPage({Key? key, this.notificheAttive}) : super(key: key);

  final bool? notificheAttive;

  @override
  State<PromemoriaRaccoltaPage> createState() => _PromemoriaRaccoltaPageState();
}

class _PromemoriaRaccoltaPageState extends State<PromemoriaRaccoltaPage> {
  late bool notificheAttive;
  final List<String> notifichePrecedenti = [
    'Raccolta carta: 2 giugno 2025, ore 7:00',
    'Raccolta plastica: 1 giugno 2025, ore 7:00',
    'Raccolta umido: 31 maggio 2025, ore 7:00',
    'Raccolta vetro: 30 maggio 2025, ore 7:00',
  ];

  @override
  void initState() {
    super.initState();
    notificheAttive = widget.notificheAttive ?? true;
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
