import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';

/// Service für die Kommunikation mit der Backend-API.
class ApiService {
  final String baseUrl;
  String? _accessToken;

  ApiService({required this.baseUrl});

  String? get accessToken => _accessToken;

  Map<String, String> get _authHeaders => {
    'Content-Type': 'application/json',
    if (_accessToken != null) 'Authorization': 'Bearer $_accessToken',
  };

  /// Meldet einen Benutzer an und speichert das Zugriffstoken.
  Future<User> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      _accessToken = data['accessToken'] as String;
      return User.fromJson(data['user'] as Map<String, dynamic>);
    }

    throw Exception('Anmeldung fehlgeschlagen (${response.statusCode})');
  }

  /// Ruft alle dem angemeldeten Techniker zugewiesenen Checklisten ab.
  Future<List<Map<String, dynamic>>> getAssignedChecklists() async {
    final response = await http.get(
      Uri.parse('$baseUrl/checklists'),
      headers: _authHeaders,
    );

    if (response.statusCode == 200) {
      final list = jsonDecode(response.body) as List<dynamic>;
      return list.cast<Map<String, dynamic>>();
    }

    throw Exception(
      'Fehler beim Laden der Checklisten (${response.statusCode})',
    );
  }

  /// Meldet den Benutzer ab und löscht das Zugriffstoken.
  void logout() {
    _accessToken = null;
  }
}
