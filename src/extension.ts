import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('singlestyle.single', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const text = editor.document.getText(selection);

			// Logic to convert selected CSS to a single line
			const singleLineText = text
				.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
				.replace(/\s*;\s*/g, '; ') // Ensure spaces around semicolons
				.replace(/\s*{\s*/g, '{ ') // Ensure spaces around opening braces
				.replace(/\s*}\s*/g, '} ') // Ensure spaces around closing braces
				.trim(); // Trim leading and trailing spaces

			// Replace the selected text with the single line version
			editor.edit(editBuilder => {
				editBuilder.replace(selection, singleLineText);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
