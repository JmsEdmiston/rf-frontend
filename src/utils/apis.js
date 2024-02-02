export const fetchTestSuitesData = async () => {
    try {
        const response = await fetch('http://localhost:3456/test_suites');
        const responseJSON = await response.json();
        return responseJSON;
    } catch(err) {
        console.error(err);
    }
}