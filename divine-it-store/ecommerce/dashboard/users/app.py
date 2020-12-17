from oscar.apps.dashboard.users import app


class UserManagementApplication(app.UserManagementApplication):
    pass


application = UserManagementApplication()
