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
    else {
        if (actual !== expected) throw error;
    }
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
    function createCell(content) {
        const cell = document.createElement('td');
        if (content !== undefined) cell.innerText = content;
        return cell;
    }
    const results = runTests();
    const table = document.createElement('table');
    const header = document.createElement('tr');
    header.appendChild(createCell('Test name'));
    header.appendChild(createCell('Passed'));
    header.appendChild(createCell('Error message'));
    table.appendChild(header);

    for (const { description, passed, error } of results) {
        const row = document.createElement('tr');
        row.appendChild(createCell(description));
        row.appendChild(createCell(passed));
        row.appendChild(createCell(error));
        table.appendChild(row);
    }

    parent.appendChild(table);
}