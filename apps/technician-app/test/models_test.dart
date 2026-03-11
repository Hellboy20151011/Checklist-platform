import 'package:flutter_test/flutter_test.dart';
import 'package:technician_app/models/user.dart';
import 'package:technician_app/models/checklist_instance.dart';

void main() {
  group('User model', () {
    test('should parse from JSON', () {
      final json = {
        'id': '550e8400-e29b-41d4-a716-446655440000',
        'email': 'tech@example.com',
        'name': 'Tech User',
        'role': 'TECHNICIAN',
      };

      final user = User.fromJson(json);

      expect(user.id, '550e8400-e29b-41d4-a716-446655440000');
      expect(user.email, 'tech@example.com');
      expect(user.name, 'Tech User');
      expect(user.role, 'TECHNICIAN');
    });

    test('should serialize to JSON', () {
      const user = User(
        id: 'abc',
        email: 'tech@example.com',
        name: 'Tech User',
        role: 'TECHNICIAN',
      );

      final json = user.toJson();

      expect(json['id'], 'abc');
      expect(json['email'], 'tech@example.com');
      expect(json['role'], 'TECHNICIAN');
    });
  });

  group('ChecklistInstance model', () {
    test('should parse from JSON', () {
      final json = {
        'id': 'inst-001',
        'templateId': 'tmpl-001',
        'templateTitle': 'Monatliche Sicherheitsprüfung',
        'status': 'IN_PROGRESS',
        'startedAt': '2024-01-01T10:00:00Z',
      };

      final instance = ChecklistInstance.fromJson(json);

      expect(instance.id, 'inst-001');
      expect(instance.templateTitle, 'Monatliche Sicherheitsprüfung');
      expect(instance.status, 'IN_PROGRESS');
      expect(instance.startedAt, '2024-01-01T10:00:00Z');
      expect(instance.submittedAt, isNull);
    });

    test('should serialize to JSON excluding null fields', () {
      const instance = ChecklistInstance(
        id: 'inst-001',
        templateId: 'tmpl-001',
        templateTitle: 'Test Checklist',
        status: 'DRAFT',
      );

      final json = instance.toJson();

      expect(json.containsKey('submittedAt'), isFalse);
      expect(json.containsKey('startedAt'), isFalse);
      expect(json['status'], 'DRAFT');
    });
  });
}
