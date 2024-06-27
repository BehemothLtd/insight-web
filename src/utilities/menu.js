export const menu = [
  {
    title: "Menu",
    children: [
      {
        title: "Dashboard",
        icon: "bx bx-home-circle",
        url: "/",
        name: ["default"],
        permission: null,
      },
      {
        title: "Users",
        icon: "bx bxs-user-detail",
        url: "/users",
        name: ["UserList", "UserDetail", "UserEdit"],
        permission: { target: "users", action: "read" },
      },
      {
        title: "Projects",
        icon: "bx bx-briefcase-alt-2",
        url: "/projects",
        name: ["projectList", "projectDetail"],
        permission: { target: "projects", action: "read" },
      },
      {
        title: "Working Logs",
        icon: "bx bx-task",
        url: "/working-time-logs",
        name: ["WorkingTimeLogs"],
        permission: null,
      },
      {
        title: "Timesheets",
        icon: "bx bx-spreadsheet",
        url: "/timesheets",
        name: ["UserTimesheets"],
        permission: null,
      },
      {
        title: "Clients",
        icon: "bx bx-user",
        url: "/clients",
        name: ["ClientList"],
        permission: { target: "clients", action: "read" },
      },
      {
        title: "Leave Day Request",
        icon: "bx bx-calendar-event",
        url: "/leave_day_requests",
        name: ["LeaveDayRequests", "LeaveDayRequestReport"],
        permission: { target: "leave_day_requests", action: "read" },
      },
      {
        title: "Project Experiences",
        icon: "bx bx-notepad",
        url: "/project_experiences",
        name: ["Project Experiences"],
        permission: { target: "project_experiences", action: "read" },
      },
    ],
  },
  {
    title: "Admin",
    children: [
      {
        title: "Attendance manage",
        icon: "bx bxs-calendar-check",
        url: "/attendance-manage",
        name: ["AdminAttendance"],
        permission: { target: "attendances", action: "read" },
      },
    ],
  },
  {
    title: "Settings",
    children: [
      {
        title: "User Groups",
        icon: "bx bx-group",
        url: "/user_groups",
        name: ["UserGroupList", "UserGroupNew", "UserGroupDetail"],
        permission: { target: "user_groups", action: "read" },
      },
      {
        title: "Issue Statuses",
        icon: "bx bx-check-circle",
        url: "/issue_statuses",
        name: ["IssueStatusList"],
        permission: { target: "issue_statuses", action: "read" },
      },
      {
        title: "Company Levels",
        icon: "bx bx-chart",
        url: "/company_levels",
        name: ["Company Levels"],
        permission: { target: "company_levels", action: "read" },
      },
      {
        title: "Devices",
        icon: "bx bx-devices",
        url: "/devices",
        name: ["Devices"],
        permission: { target: "devices", action: "read" },
      },
    ],
  },
  {
    title: "Slacks",
    children: [
      {
        title: "User Groups",
        icon: "fas fa-users font-size-16",
        url: "/slacks/user_groups",
        name: ["SlacksUserGroupList"],
        permission: { target: "slack_user_groups", action: "read" },
      },
    ],
  },
];
