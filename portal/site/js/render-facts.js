var Facts = Facts || {
    reports: {},
    findings: {},
    hazards: {},
    trained: {}
};

if (Facts !== null && typeof Facts === 'undefined') {
    var reports = Facts.reports.count || 0,
        findings = Facts.findings.count || 0,
        hazards = Facts.hazards.count || 0,
        trained = Facts.trained.count || 0;
        
    jQuery('#reports').html(reports);
    jQuery('#findings').html(findings);
    jQuery('#hazards').html(hazards);
    jQuery('#trained').html(trained);
}