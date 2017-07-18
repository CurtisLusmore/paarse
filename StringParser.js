/**
 * String-specific Parser combinators and factories.
 */
class StringParser extends Parser {
    /**
     * A primitive parser that matches the end of input.
     */
    static get eos() {
        return StringParser.predicate(
            function ({ input, position }) {
                return input.length === position
                    ? [undefined, { input, position }]
                    : undefined;
            }
        );
    }

    /**
     * A combinator that also checks for end of input.
     */
    finalize() {
        const parser = this;
        return StringParser
            .sequence(parser, StringParser.eos)
            .errorOnFail()
            .bind(([result,]) => result);
    }

    /**
     * Run this parser against the supplied input.
     */
    run(input) {
        // failure not possible
        const { success, error } = this
            .finalize()
            .parse({ input, position: 0 });
        if (error) throw error;

        // guaranteed no remaining input
        const [result] = success;
        return result;
    }

    /**
     * A basic parser that matches a single character.
     */
    static character(char) {
        return StringParser.predicate(
            function ({ input, position }) {
                return input[position] === char
                    ? [input[position], { input, position: position + 1 }]
                    : undefined;
            }
        );
    }

    /**
     * A basic parser that matches a string.
     */
    static string(string) {
        return StringParser
            .sequence(...string.split('').map(StringParser.character))
            .bind(cs => cs.join(''));
    }
};