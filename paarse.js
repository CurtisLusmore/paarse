/**
 * A parser is an object with a `parse` method that takes a single argument as
 * input and returns a parse result as an output. A parse result has exactly
 * one of the following properties: "success", "failure", "error".
 *
 *  * If the result has the "success" property, the parse was successful and
 *      the value is the pair of the result of the parse and the remainder of
 *      the unconsumed input.
 *
 *  * If the result has the "failure" property, the parse was unsuccessful but
 *      but not fatally so, and other parsers may be attempted on the input.
 *      For example, this is used by the `choice` parser combinator, which
 *      matches the first of its component parsers that matches the input. If
 *      one parser fails, the remaining parsers are still attempted.
 *
 *  * If the result has the "error" property, the parse was fatally unsuccesful
 *      and no further parsing is attempted. For example, the `choice` paser
 *      combinator will abort early with an error if one of its component
 *      parsers errors.
 */


/**
 * Basic Parser combinators and factories.
 */
class Parser {
    /**
     * Create a new parser.
     */
    constructor(parse) {
        if (parse instanceof Parser) parse = parse.parse;
        this.parse = parse;
    }

    /**
     * A primitive parser that always succeeds.
     */
    static constantSuccess(result, next) {
        return new this(
            function (input) {
                return { success: [result, next(input)] };
            }
        );
    }

    /**
     * A primitive parser that always fails.
     */
    static constantFailure(failure) {
        return new this(
            function (input) {
                return { failure };
            }
        );
    }

    /**
     * A primitive parser that always errors.
     */
    static constantError(error) {
        return new this(
            function (input) {
                return { error };
            }
        );
    }

    /**
     * A basic parser that attempts to match the input, or fails if no match is
     * found.
     */
    static predicate(match) {
        return new this(
            function (input) {
                const success = match(input);
                if (success) return { success };
                return { failure: true };
            }
        );
    }

    /**
     * A combinator that converts errors to failures.
     */
    try() {
        const parser = this;
        return new this.constructor(
            function (input) {
                const { success, failure, error } = parser.parse(input);
                if (success) return { success };
                if (failure) return { failure };
                return { failure: error };
            }
        );
    }

    /**
     * A combinator that repeats a parser until it fails.
     */
    many(minCount = 1, maxCount = Infinity) {
        const parser = this;
        return new this.constructor(
            function (input) {
                const results = [];
                while (results.length < maxCount) {
                    const { success, failure, error } = parser.parse(input);
                    if (error) return { error };
                    if (failure) break;
                    const [result, next] = success;
                    results.push(result);
                    input = next;
                }

                if (minCount <= results.length) {
                    return { success: [results, input] };
                }

                return results.length == 0
                    ? { failure: true }
                    : { error: true };
            }
        );
    }

    /**
     * A combinator that transforms successes, failures and errors.
     */
    bind(onSuccess, onFailure = f => f, onError = e => e) {
        const parser = this;
        return new this.constructor(
            function (input) {
                const { success, failure, error } = parser.parse(input);
                if (failure) return { failure: onFailure(failure) };
                if (error) return { error: onError(error) };
                const [result, next] = success;
                return { success: [onSuccess(result), next] };
            }
        );
    }

    /**
     * A combinator that creates a new parser that matches the first of its
     * component parsers that matches the input. If no match is found, it
     * fails since no input was consumed.
     */
    static choice(...parsers) {
        return new this(
            function (input) {
                for (const parser of parsers) {
                    const { success, failure, error } = parser.parse(input);
                    if (error) return { error };
                    if (success) return { success };
                    // continue on failure
                }
                // no match found
                return { failure: true };
            }
        );
    }

    /**
     * A combinator that creates a new parser which produces an array of the
     * matches from all of its component parsers applied sequentially. If the
     * first component parser fails, it fails since no input was consumed. If
     * any other parser fails, or if any parser errors, it errors.
     */
    static sequence(...parsers) {
        return new this(
            function (input) {
                const results = [];
                for (const parser of parsers) {
                    const { success, failure, error } = parser.parse(input);
                    if (error) return { error };
                    if (failure) return results.length > 0
                        ? { error: true }
                        : { failure };
                    const [result, next] = success;
                    results.push(result);
                    input = next;
                }
                return { success: [results, input] };
            }
        );
    }
};


/**
 * String-specific Parser combinators and factories.
 */
class StringParser extends Parser {
    /**
     * Create a new string parser.
     */
    constructor(parse) {
        super(parse);
    }

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
            .bind(([result,]) => result);
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