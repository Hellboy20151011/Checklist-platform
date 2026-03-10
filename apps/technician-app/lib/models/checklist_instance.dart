/// Modell für eine Checklist-Instanz.
class ChecklistInstance {
  final String id;
  final String templateId;
  final String templateTitle;
  final String status;
  final String? startedAt;
  final String? submittedAt;

  const ChecklistInstance({
    required this.id,
    required this.templateId,
    required this.templateTitle,
    required this.status,
    this.startedAt,
    this.submittedAt,
  });

  factory ChecklistInstance.fromJson(Map<String, dynamic> json) {
    return ChecklistInstance(
      id: json['id'] as String,
      templateId: json['templateId'] as String,
      templateTitle: json['templateTitle'] as String,
      status: json['status'] as String,
      startedAt: json['startedAt'] as String?,
      submittedAt: json['submittedAt'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'templateId': templateId,
        'templateTitle': templateTitle,
        'status': status,
        if (startedAt != null) 'startedAt': startedAt,
        if (submittedAt != null) 'submittedAt': submittedAt,
      };
}
