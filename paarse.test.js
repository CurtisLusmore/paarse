test(
    '`constantSuccess` results in success',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next');
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`constantSuccess` gives correct result',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next');
        const result = parser.parse(undefined);
        assertEqual(
            'success',
            result.success[0]
        );
    }
);

test(
    '`constantSuccess` gives correct remaining input',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next');
        const result = parser.parse(undefined);
        assertEqual(
            'next',
            result.success[1]
        );
    }
);


test(
    '`constantFailure` results in failure',
    () => {
        const parser = Parser.constantFailure('failure');
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`constantFailure` gives correct result',
    () => {
        const parser = Parser.constantFailure('failure');
        const result = parser.parse(undefined);
        assertEqual(
            'failure',
            result.failure
        );
    }
);


test(
    '`constantError` results in error',
    () => {
        const parser = Parser.constantError('error');
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);

test(
    '`constantError` gives correct result',
    () => {
        const parser = Parser.constantError('error');
        const result = parser.parse(undefined);
        assertEqual(
            'error',
            result.error
        );
    }
);


test(
    '`predicate` succeeds on correct input',
    () => {
        const parser = Parser.predicate(
            input => input === 'expected'
                ? ['expected', 'next']
                : undefined
        );
        const result = parser.parse('expected');
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`predicate` gives correct result on correct input',
    () => {
        const parser = Parser.predicate(
            input => input === 'expected'
                ? ['expected', 'next']
                : undefined
        );
        const result = parser.parse('expected');
        assertEqual(
            'expected',
            result.success[0]
        );
    }
);

test(
    '`predicate` gives correct remaining input on correct input',
    () => {
        const parser = Parser.predicate(
            input => input === 'expected'
                ? ['expected', 'next']
                : undefined
        );
        const result = parser.parse('expected');
        assertEqual(
            'next',
            result.success[1]
        );
    }
);

test(
    '`predicate` fails on incorrect input',
    () => {
        const parser = Parser.predicate(
            input => input === 'expected'
                ? ['expected', 'next']
                : undefined
        );
        const result = parser.parse('unexpected');
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);


test(
    '`try` succeeds on underlying success',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next').try();
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`try` gives correct result on underlying success',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next').try();
        const result = parser.parse(undefined);
        assertEqual(
            'success',
            result.success[0],
        );
    }
);

test(
    '`try` gives correct remaining input on underlying success',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next').try();
        const result = parser.parse(undefined);
        assertEqual(
            'next',
            result.success[1],
        );
    }
);

test(
    '`try` fails on underlying failure',
    () => {
        const parser = Parser.constantFailure('failure').try();
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`try` gives correct result on underlying failure',
    () => {
        const parser = Parser.constantFailure('failure').try();
        const result = parser.parse(undefined);
        assertEqual(
            'failure',
            result.failure
        );
    }
);

test(
    '`try` fails on underlying error',
    () => {
        const parser = Parser.constantError('error').try();
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`try` gives correct result on underlying error',
    () => {
        const parser = Parser.constantError('error').try();
        const result = parser.parse(undefined);
        assertEqual(
            'error',
            result.failure
        );
    }
);


test(
    '`bind` succeeds on underlying success',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next')
            .bind(_ => 'success2', _ => 'failure2', _ => 'error2');
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`bind` gives correct result on underlying success',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next')
            .bind(_ => 'success2', _ => 'failure2', _ => 'error2');
        const result = parser.parse(undefined);
        assertEqual(
            'success2',
            result.success[0],
        );
    }
);

test(
    '`bind` gives correct remaining input on underlying success',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next')
            .bind(_ => 'success2', _ => 'failure2', _ => 'error2');
        const result = parser.parse(undefined);
        assertEqual(
            'next',
            result.success[1],
        );
    }
);

test(
    '`bind` fails on underlying failure',
    () => {
        const parser = Parser.constantFailure('failure')
            .bind(_ => 'success2', _ => 'failure2', _ => 'error2');
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`bind` gives correct result on underlying failure',
    () => {
        const parser = Parser.constantFailure('failure')
            .bind(_ => 'success2', _ => 'failure2', _ => 'error2');
        const result = parser.parse(undefined);
        assertEqual(
            'failure2',
            result.failure
        );
    }
);

test(
    '`bind` errors on underlying error',
    () => {
        const parser = Parser.constantError('error')
            .bind(_ => 'success2', _ => 'failure2', _ => 'error2');
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);

test(
    '`bind` gives correct result on underlying error',
    () => {
        const parser = Parser.constantError('error')
            .bind(_ => 'success2', _ => 'failure2', _ => 'error2');
        const result = parser.parse(undefined);
        assertEqual(
            'error2',
            result.error
        );
    }
);


test(
    '`choice` results in failure with no components',
    () => {
        const parser = Parser.choice();
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`choice` results in success with successful component',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`choice` gives correct result with successful component',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertTrue(
            'success',
            result.success[0]
        );
    }
);

test(
    '`choice` gives correct remaining input with successful component',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertTrue(
            'next',
            result.success[1]
        );
    }
);

test(
    '`choice` results in failure with failure component',
    () => {
        const parser = Parser.choice(Parser.constantFailure('failure'));
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`choice` results in error with error component',
    () => {
        const parser = Parser.choice(Parser.constantError('error'));
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);

test(
    '`choice` results in success with two successful components',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantSuccess('success2', _ => 'next2')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`choice` gives correct result with two successful components',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantSuccess('success2', _ => 'next2')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'success',
            result.success[0]
        );
    }
);

test(
    '`choice` gives correct remaining input with two successful components',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantSuccess('success2', _ => 'next2')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'next',
            result.success[1]
        );
    }
);

test(
    '`choice` results in success with successful and failure',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantFailure('failure')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`choice` gives correct result with successful and failure',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantFailure('failure')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'success',
            result.success[0]
        );
    }
);

test(
    '`choice` gives correct remaining input with successful and failure',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantFailure('failure')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'next',
            result.success[1]
        );
    }
);

test(
    '`choice` results in success with successful and error',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantError('error')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`choice` gives correct result with successful and error',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantError('error')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'success',
            result.success[0]
        );
    }
);

test(
    '`choice` gives correct remaining input with successful and error',
    () => {
        const parser = Parser.choice(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantError('error')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'next',
            result.success[1]
        );
    }
);

test(
    '`choice` results in success with failure and successful component',
    () => {
        const parser = Parser.choice(
            Parser.constantFailure('failure'),
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`choice` gives correct result with failure and successful component',
    () => {
        const parser = Parser.choice(
            Parser.constantFailure('failure'),
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'success',
            result.success[0]
        );
    }
);

test(
    '`choice` gives correct remaining input with failure and successful component',
    () => {
        const parser = Parser.choice(
            Parser.constantFailure('failure'),
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'next',
            result.success[1]
        );
    }
);

test(
    '`choice` results in error with failure and error component',
    () => {
        const parser = Parser.choice(
            Parser.constantFailure('failure'),
            Parser.constantError('error')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);

test(
    '`choice` results in error with error and successful component',
    () => {
        const parser = Parser.choice(
            Parser.constantError('error'),
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);


test(
    '`sequence` results in success with no components',
    () => {
        const parser = Parser.sequence();
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`sequence` results in success with successful component',
    () => {
        const parser = Parser.sequence(
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`sequence` gives correct result with successful component',
    () => {
        const parser = Parser.sequence(
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertTrue(
            'success',
            result.success[0]
        );
    }
);

test(
    '`sequence` gives correct remaining input with successful component',
    () => {
        const parser = Parser.sequence(
            Parser.constantSuccess('success', _ => 'next')
        );
        const result = parser.parse(undefined);
        assertTrue(
            'next',
            result.success[1]
        );
    }
);

test(
    '`sequence` results in failure with failure component',
    () => {
        const parser = Parser.sequence(Parser.constantFailure('failure'));
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`sequence` results in error with error component',
    () => {
        const parser = Parser.sequence(Parser.constantError('error'));
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);

test(
    '`sequence` results in success with two successful components',
    () => {
        const parser = Parser.sequence(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantSuccess('success2', _ => 'next2')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`sequence` gives correct result with two successful components',
    () => {
        const parser = Parser.sequence(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantSuccess('success2', _ => 'next2')
        );
        const result = parser.parse(undefined);
        assertEqual(
            ['success', 'success2'],
            result.success[0]
        );
    }
);

test(
    '`sequence` gives correct remaining input with two successful components',
    () => {
        const parser = Parser.sequence(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantSuccess('success2', _ => 'next2')
        );
        const result = parser.parse(undefined);
        assertEqual(
            'next2',
            result.success[1]
        );
    }
);

test(
    '`sequence` results in error with successful and failure',
    () => {
        const parser = Parser.sequence(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantFailure('failure')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);

test(
    '`sequence` results in error with successful and error',
    () => {
        const parser = Parser.sequence(
            Parser.constantSuccess('success', _ => 'next'),
            Parser.constantError('error')
        );
        const result = parser.parse(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);


test(
    '`eos` results in success on empty input',
    () => {
        const parser = StringParser.eos;
        const result = parser.parse({ input: '', position: 0 });
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`eos` results in failure on non-empty input',
    () => {
        const parser = StringParser.eos;
        const result = parser.parse({ input: 'a', position: 0 });
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`eos` results in success at end of non-empty input',
    () => {
        const parser = StringParser.eos;
        const result = parser.parse({ input: 'a', position: 1 });
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);


test(
    '`character` results in success on correct input',
    () => {
        const parser = StringParser.character('a');
        const result = parser.parse({ input: 'a', position: 0 });
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`character` gives correct result on correct input',
    () => {
        const parser = StringParser.character('a');
        const result = parser.parse({ input: 'a', position: 0 });
        assertEqual(
            'a',
            result.success[0]
        );
    }
);

test(
    '`character` gives correct remaining input on correct input',
    () => {
        const parser = StringParser.character('a');
        const result = parser.parse({ input: 'a', position: 0 });
        assertEqual(
            { input: 'a', position: 1 },
            result.success[1]
        );
    }
);

test(
    '`character` results in failure on incorrect input',
    () => {
        const parser = StringParser.character('a');
        const result = parser.parse({ input: 'b', position: 0 });
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`character` results in success on correct input at specific position',
    () => {
        const parser = StringParser.character('a');
        const result = parser.parse({ input: ' a', position: 1 });
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);


test(
    '`string` results in success on correct input',
    () => {
        const parser = StringParser.string('ab');
        const result = parser.parse({ input: 'ab', position: 0 });
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`string` gives correct result on correct input',
    () => {
        const parser = StringParser.string('ab');
        const result = parser.parse({ input: 'ab', position: 0 });
        assertEqual(
            'ab',
            result.success[0]
        );
    }
);

test(
    '`string` gives correct remaining input on correct input',
    () => {
        const parser = StringParser.string('ab');
        const result = parser.parse({ input: 'ab', position: 0 });
        assertEqual(
            { input: 'ab', position: 2 },
            result.success[1]
        );
    }
);

test(
    '`string` results in failure on incorrect input',
    () => {
        const parser = StringParser.string('ab');
        const result = parser.parse({ input: 'cd', position: 0 });
        assertTrue(
            result.hasOwnProperty('failure'),
            'Result is not failure'
        );
    }
);

test(
    '`string` results in error on incorrect input if some input is consumed',
    () => {
        const parser = StringParser.string('ab');
        const result = parser.parse({ input: 'ac', position: 0 });
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);

test(
    '`string` results in success on correct input at specific position',
    () => {
        const parser = StringParser.string('ab');
        const result = parser.parse({ input: ' ab', position: 1 });
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);


test(
    '`finalize` results in success at end of string',
    () => {
        const parser = StringParser.character('a').finalize();
        const result = parser.parse({ input: 'a', position: 0 });
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`finalize` gives correct result at end of string',
    () => {
        const parser = StringParser.character('a').finalize();
        const result = parser.parse({ input: 'a', position: 0 });
        assertEqual(
            'a',
            result.success[0]
        );
    }
);

test(
    '`finalize` results in success at end of string from specific position',
    () => {
        const parser = StringParser.character('a').finalize();
        const result = parser.parse({ input: ' a', position: 1 });
        assertTrue(
            result.hasOwnProperty('success'),
            'Result is not success'
        );
    }
);

test(
    '`finalize` results in error when not at end of string',
    () => {
        const parser = StringParser.character('a').finalize();
        const result = parser.parse({ input: 'ab', position: 0 });
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);