import 'package:flutter/material.dart';
import 'map_page.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'dashboard.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: EcoTrackHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}
