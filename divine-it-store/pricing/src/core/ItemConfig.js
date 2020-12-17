
export const SOFTWARE = 'SOFTWARE';
export const SOFTWARE_CUSTOM = 'SOFTWARE_CUSTOM';
export const SOFTWARE_REPORT = 'SOFTWARE_REPORT';
export const REQUIREMENT = 'REQUIREMENT';
export const CONFIGURATION = 'CONFIGURATION';
export const TRAINING = 'TRAINING';
export const PROJECT = 'PROJECT';
export const CONSULTANT = 'CONSULTANT';
export const ONSITE_SUPPORT = 'ONSITE_SUPPORT';
export const REMOTE_SUPPORT = 'REMOTE_SUPPORT';

const SEGMENTS = {
  SOFTWARE: {weight: 1, name: 'Software License', unit: '', phase: 'software'},
  USER: {name: 'Additional User', unit: 'users', multiplier: 'params.users', phase: 'user', rounding: 5},
  SOFTWARE_CUSTOM: {weight: 0.1, name: 'Software Customization', rounding: 0.25, unit: 'man-days',unitPrice:16000, 'pip': 'params.custom', phase: 'custom'},
  SOFTWARE_REPORT: {weight: 0.1, name: 'Customized Report', rounding: 1.0, unit: 'man-days', unitPrice:16000, 'pip': 'params.report', phase: 'custom'},
  REQUIREMENT: { weight: 0.2, name: 'Requirement Analysis', rounding: 0.25, unit: 'man-days', unitPrice:10000, 'pip': 'params.requirement', 'aggregate': true, phase: 'pip'},
  DEPLOYMENT: { weight:0, name: 'Deployment', rounding: 1, unit: '(onetime)', minUnit: 1, unitPrice:10000, 'pip': 'params.deployment', phase: 'pip'},
  CONFIGURATION: { weight:0.05, name: 'Configuration', rounding: 0.25, unit: 'man-days', unitPrice:10000, 'pip': 'params.configuration', phase: 'pip'},
  ONSITE_SUPPORT: { weight: 0.1, name: 'Onsite Adoption Support', rounding: 0.25, unit: 'man-days', unitPrice:6000, 'pip': 'params.onsite', phase: 'pip'},
  TRAINING: {weight: 0.1, name: 'Training', rounding: 1.0, minUnit: 1, unit: 'sessions', unitPrice:6000, 'pip': 'params.training', 'aggregate': true, phase: 'pip'},
  PROJECT: { weight: 0.1, name: 'Project Management', rounding: 0.1, unit: 'man-days', unitPrice:12000, 'pip': 'params.project', phase: 'pip'},
  CONSULTANT: {weight: 0.1, name: 'Consultancy', rounding: 0.1, unit: 'mandays', unitPrice:20000, 'pip': 'params.consultancy', phase: 'pip'},
  AMC: {weight: 0.2, name: 'Annual Maintenance Cost', phase: 'maintenance'}
};

export default { SEGMENTS };
