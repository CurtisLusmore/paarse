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


test(
    '`run` gives correct result on complete string',
    () => {
        const parser = StringParser.character('a');
        const result = parser.run('a');
        assertEqual(
            'a',
            result
        );
    }
);

test(
    '`run` results in error when not at end of string',
    () => {
        const parser = StringParser.character('a').finalize();
        assertThrows(() => parser.run('ab'));
    }
);

test(
    '`run` results in error on failure',
    () => {
        const parser = StringParser.character('ab').finalize();
        assertThrows(() => parser.run('ac'));
    }
);