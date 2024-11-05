import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('singless.convert', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			const lineCount = selection.end.line - selection.start.line + 1;

			const formatedText = (lineCount > 1) ? text
					.replace(/\s+/g, ' ')
					.replace(/\s*;\s*/g, '; ')
					.replace(/\s*{\s*/g, '{ ')
					.replace(/\s*}\s*/g, '} ')
					.trim() : text
						.replace(/;\s*/g, ';\n\t')
						.replace(/\{\s*/g, '{\n\t')
						.replace(/\s*\}/g, '\n}')
						.trim();

			// Replace the selected text with the single line version
			editor.edit(editBuilder => {
				editBuilder.replace(selection, formatedText);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
