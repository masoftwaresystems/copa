/*global Facts*/

jQuery(document).ready(function () {
    var facts = Facts || {
        reports: {},
        findings: {},
        hazards: {},
        trained: {}
    };
    
    if (facts !== null && typeof facts === 'undefined') {
        var reports = facts.reports.count || 0,
            findings = facts.findings.count || 0,
            hazards = facts.hazards.count || 0,
            trained = facts.trained.count || 0;
            
        jQuery('#reports').html(reports);
        jQuery('#findings').html(findings);
        jQuery('#hazards').html(hazards);
        jQuery('#trained').html(trained);
    }
    console.log('THE END');
});