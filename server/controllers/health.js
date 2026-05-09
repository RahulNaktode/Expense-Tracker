const getHome = (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Expense Tracker API"
    })
};

const getHealth = (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy"
    })
};

export { getHome, getHealth };