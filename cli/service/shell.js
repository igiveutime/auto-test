import shell from 'shelljs';

export default class Shell {
    static cd(...args) {
        shell.cd(...args);
    }

    static exec(command, silent = true, async = false) {
        shell.exec(command, { silent, async })
    }

    static execWithOutput(command, silent = true, multiLine = false) {
        const output = shell.exec(command, { silent }).stdout;

        if (!output) {
            return '';
        }

        if (multiLine) {
            return output;
        }

        return output
            .replace('\n', '')
            .trim();
    }
}
