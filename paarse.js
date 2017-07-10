/**
 * A parser is a function that takes a single argument as input and returns a
 * parse result as an output. A parse result has exactly one of the following
 * properties: "success", "failure", "error".
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
 * Partial function application.
 */
Function.prototype.partial = function (...args1) {
    return (...args2) => this(...args1, ...args2);
};


/**
 * Basic Parser combinators and factories.
 */
const Parser = {
    /**
     * Create a parser by attaching unary parser combinators as methods to the
     * supplied parser.
     */
    create(parser) {
        parser.try = Parser.try.partial(parser);
        parser.bind = Parser.bind.partial(parser);
        return parser;
    },

    /**
     * A primitive parser that always succeeds.
     */
    constantSuccess(result, next) {
        return Parser.create(
            function (input) {
                return { success: [result, next(input)] };
            }
        );
    },

    /**
     * A primitive parser that always fails.
     */
    constantFailure(failure) {
        return Parser.create(
            function (input) {
                return { failure };
            }
        );
    },

    /**
     * A primitive parser that always errors.
     */
    constantError(error) {
        return Parser.create(
            function (input) {
                return { error };
            }
        );
    },

    /**
     * A basic parser that attempts to match the input, or fails if no match is
     * found.
     */
    predicate(match) {
        return Parser.create(
            function (input) {
                const success = match(input);
                if (success) return { success };
                return { failure: true };
            }
        );
    },

    /**
     * A combinator that converts errors to failures.
     */
    try(parser) {
        return Parser.create(
            function (input) {
                const { success, failure, error } = parser(input);
                if (success) return { success };
                if (failure) return { failure };
                return { failure: error };
            }
        );
    },

    /**
     * A combinator that transforms successes, failures and errors.
     */
    bind(parser, onSuccess, onFailure = f => f, onError = e => e) {
        return Parser.create(
            function (input) {
                const { success, failure, error } = parser(input);
                if (failure) return { failure: onFailure(failure) };
                if (error) return { error: onError(error) };
                const [result, next] = success;
                return { success: [onSuccess(result), next] };
            }
        );
    },

    /**
     * A combinator that creates a new parser that matches the first of its
     * component parsers that matches the input. If no match is found, it
     * fails since no input was consumed.
     */
    choice(...parsers) {
        return Parser.create(
            function (input) {
                for (const parser of parsers) {
                    const { success, failure, error } = parser(input);
                    if (error) return { error };
                    if (success) return { success };
                    // continue on failure
                }
                // no match found
                return { failure: true };
            }
        );
    },

    /**
     * A combinator that creates a new parser which produces an array of the
     * matches from all of its component parsers applied sequentially. If the
     * first component parser fails, it fails since no input was consumed. If
     * any other parser fails, or if any parser errors, it errors.
     */
    sequence(...parsers) {
        return Parser.create(
            function (input) {
                const results = [];
                for (const parser of parsers) {
                    const { success, failure, error } = parser(input);
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