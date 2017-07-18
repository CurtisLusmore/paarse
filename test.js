const tests = [];

/**
 * Describe a test.
 */
function test(description, run) {
    tests.push({
        description,
        run
    });
}

/**
 * Assert that a value is true.
 */
function assertTrue(assertion, message) {
    if (!assertion) throw message || 'Assertion failed';
}

/**
 * Assert that two values are equal.
 */
function assertEqual(expected, actual) {
    const error = `Expected ${expected} but got ${actual}`;
    if (Array.isArray(expected) && Array.isArray(actual)) {
        if (expected.length !== actual.length) throw error;
        for (const index in expected) {
            assertEqual(expected[index], actual[index]);
        }
    }
    else if (typeof expected == 'object' && typeof actual == 'object') {
        for (const key in expected) {
            assertEqual(expected[key], actual[key]);
        }
        for (const key in actual) {
            assertEqual(expected[key], actual[key]);
        }
    }
    else {
        if (actual !== expected) throw error;
    }
}

/**
 * Assert that an error is thrown when running the supplied operation.
 */
function assertThrows(assertion, message) {
    try {
        assertion()
    }
    catch (error) {
        return;
    }
    throw message || 'Assertion failed';
}

/**
 * Run a test and return the results.
 */
function runTest({ description, run }) {
    try {
        run();
    }
    catch (error) {
        return {
            description,
            passed: false,
            error
        };
    }

    return {
        description,
        passed: true
    };
}

/**
 * Run all described tests and return the results.
 */
function runTests() {
    return tests.map(runTest);
}

/**
 * Run all describe tests and display the results in a table, which is placed
 * into the supplied DOM element.
 */
function displayResults(parent) {
    function createRow(...elements) {
        const row = document.createElement('tr');
        elements.forEach(element => row.appendChild(createCell(element)));
        return row;
    }

    function createCell(content) {
        const cell = document.createElement('td');
        if (content !== undefined) cell.innerText = content;
        return cell;
    }

    const results = runTests();
    const table = document.createElement('table');

    const header = createRow(
        'Test name',
        'Passed',
        'Error message'
    );
    table.appendChild(header);

    const summary = createRow(
        'Total tests',
        '0/0',
        ''
    );
    table.appendChild(summary);

    let passedTests = 0;
    let totalTests = 0;
    for (const { description, passed, error } of results) {
        const row = createRow(
            description,
            passed,
            error
        );
        table.appendChild(row);
        if (passed) passedTests++;
        totalTests++;
    }

    summary.childNodes[1].innerText = `${passedTests}/${totalTests}`

    parent.appendChild(table);
}