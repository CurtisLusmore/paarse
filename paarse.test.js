test(
    '`constantSuccess` results in success',
    () => {
        const parser = Parser.constantSuccess('success', _ => 'next');
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser('expected');
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
        const result = parser('expected');
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
        const result = parser('expected');
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
        const result = parser('unexpected');
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
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
        const result = parser(undefined);
        assertTrue(
            result.hasOwnProperty('error'),
            'Result is not error'
        );
    }
);