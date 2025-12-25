const getSettingPage = (req, res) => {
    res.render('admin/settings', {role : req.role});
};

export { getSettingPage };