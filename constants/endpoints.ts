// Users
export const USERS = '/users';
export const USERS_SEARCH = '/users/search';
export const USER_BY_ID = '/users/:id';
export const USER_UPDATE = '/users/:id';
export const USER_UPDATE_DEPARTMENT = '/users/:id/department';

// Auth
export const AUTH_REGISTER = '/auth/register';
export const AUTH_REGISTER_ADMIN = '/auth/register-admin';
export const AUTH_REGISTER_PUBLIC_KEY = '/auth/register-public-key';
export const AUTH_BIOMETRIC_KEY_DELETE = '/auth/biometric-key';
export const AUTH_LOGIN = '/auth/login';
export const AUTH_REFRESH_TOKEN = '/auth/refresh-token';

// Departments
export const DEPARTMENTS_CREATE = '/departments';
export const DEPARTMENTS_GET_ALL = '/departments';
export const DEPARTMENT_UPDATE = '/departments/:id';

// Attendance
export const ATTENDANCE_CHECK_IN = '/attendance/check-in';
export const ATTENDANCE_CHECK_OUT = '/attendance/check-out';
export const ATTENDANCE_TODAY = '/attendance/today';
export const ATTENDANCE_MY_HISTORY = '/attendance/my-history';
export const ATTENDANCE_TEAM = '/attendance/team';
export const ATTENDANCE_ALL = '/attendance/all';
export const ATTENDANCE_CURRENTLY_WORKING = '/attendance/currently-working';
export const ATTENDANCE_GENERATE_CHALLENGE = '/attendance/generate-challenge';
export const ATTENDANCE_WORK_SCHEDULE = '/attendance/work-schedule';

// Tasks
export const TASKS_CREATE = '/tasks';
export const TASKS_GET_ALL = '/tasks';
export const TASKS_MY_STATS = '/tasks/my-stats';
export const TASK_BY_ID = '/tasks/:id';
export const TASK_UPDATE = '/tasks/:id';
export const TASK_DELETE = '/tasks/:id';

// Events
export const EVENTS_CREATE = '/events';
export const EVENTS_GET_ALL = '/events';
export const EVENT_BY_ID = '/events/:id';
export const EVENT_UPDATE = '/events/:id';
export const EVENT_RESPOND = '/events/:id/respond';
export const EVENT_DELETE = '/events/:id';

// Tickets
export const TICKETS_CREATE = '/tickets';
export const TICKETS_GET_ALL = '/tickets';
export const TICKET_BY_ID = '/tickets/:id';
export const TICKET_UPDATE = '/tickets/:id';
export const TICKET_APPROVE = '/tickets/:id/approve';
export const TICKET_REJECT = '/tickets/:id/reject';
export const TICKET_DELETE = '/tickets/:id';

// Messages
export const MESSAGES_CREATE = '/messages';
export const MESSAGES_GET_ALL = '/messages';
export const MESSAGE_BY_ID = '/messages/:id';
export const MESSAGE_UPDATE = '/messages/:id';
export const MESSAGE_DELETE = '/messages/:id';

// Notifications
export const NOTIFICATIONS_CREATE = '/notifications';
export const NOTIFICATIONS_GET_ALL = '/notifications';
export const NOTIFICATION_BY_ID = '/notifications/:id';
export const NOTIFICATION_UPDATE = '/notifications/:id';
export const NOTIFICATION_DELETE = '/notifications/:id';

// Suggestions
export const SUGGESTIONS_CREATE = '/suggestions';
export const SUGGESTIONS_GET_ALL = '/suggestions';
export const SUGGESTIONS_CATEGORIES = '/suggestions/categories';
export const SUGGESTION_BY_ID = '/suggestions/:id';
export const SUGGESTION_UPDATE = '/suggestions/:id';
export const SUGGESTION_UPDATE_STATUS = '/suggestions/:id/status';
export const SUGGESTION_VOTE = '/suggestions/:id/vote';
export const SUGGESTION_VOTE_DELETE = '/suggestions/:id/vote';
export const SUGGESTION_DELETE = '/suggestions/:id';

// Payroll
export const PAYROLL_MY_DOCUMENTS = '/payroll/my-documents';
export const PAYROLL_ALL_DOCUMENTS = '/payroll/all-documents';
export const PAYROLL_BY_ID = '/payroll/:id';
export const PAYROLL_DELETE = '/payroll/:id';

// Uploads
export const UPLOAD_IMAGE = '/upload/image';
export const UPLOAD_IMAGE_DELETE = '/upload/image/:filename';
export const UPLOAD_PROFILE_IMAGE = '/upload/profile-image/:userId';
export const UPLOAD_PROFILE = '/upload/profile/:userId';
export const UPLOAD_PAYROLL_DOCUMENT = '/upload/payroll-document';
export const UPLOAD_PAYROLL_DOCUMENT_DELETE = '/upload/payroll-document/:filename';

// Performance
export const PERFORMANCE_CREATE = '/performance';
export const PERFORMANCE_GET_ALL = '/performance';
export const PERFORMANCE_BY_ID = '/performance/:id';
export const PERFORMANCE_UPDATE = '/performance/:id';
export const PERFORMANCE_DELETE = '/performance/:id';

// Company Locations
export const COMPANY_LOCATIONS_CREATE = '/company-locations';
export const COMPANY_LOCATIONS_GET_ALL = '/company-locations';
export const COMPANY_LOCATION_BY_ID = '/company-locations/:id';
export const COMPANY_LOCATION_UPDATE = '/company-locations/:id';