var F3ScriptsApp = angular.module('F3ScriptsApp', ['ngRoute', 'xeditable', 'LocalStorageModule', 'ui.bootstrap']);

// Used to theme the editable fields
F3ScriptsApp.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
});
