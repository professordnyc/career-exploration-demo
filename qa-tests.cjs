const fs = require('fs');
const path = require('path');

const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, fn) {
  try {
    fn();
    results.passed++;
    results.tests.push({ name, status: 'PASS', notes: '' });
    console.log(`✓ ${name}`);
  } catch (error) {
    results.failed++;
    results.tests.push({ name, status: 'FAIL', notes: error.message });
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('\n=== QA Test Suite ===\n');
console.log('Running lightweight tests on core modules...\n');

console.log('--- Resume Upload Module ---');

test('Resume JSON file exists', () => {
  const filePath = path.join(__dirname, 'mock_resume.json');
  assert(fs.existsSync(filePath), 'mock_resume.json file not found');
});

test('Resume JSON has valid structure', () => {
  const filePath = path.join(__dirname, 'mock_resume.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  assert(data.name, 'Resume missing name field');
  assert(data.education, 'Resume missing education field');
  assert(Array.isArray(data.skills), 'Resume skills must be an array');
  assert(Array.isArray(data.experiences), 'Resume experiences must be an array');
  assert(data.skills.length > 0, 'Resume must have at least one skill');
  assert(data.experiences.length > 0, 'Resume must have at least one experience');
});

test('Resume experiences have required fields', () => {
  const filePath = path.join(__dirname, 'mock_resume.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  data.experiences.forEach((exp, index) => {
    assert(exp.role, `Experience ${index} missing role`);
    assert(exp.organization, `Experience ${index} missing organization`);
  });
});

console.log('\n--- Chat Assistant Module ---');

test('Alumni outcomes CSV file exists', () => {
  const filePath = path.join(__dirname, 'mock_alumni_outcomes.csv');
  assert(fs.existsSync(filePath), 'mock_alumni_outcomes.csv file not found');
});

test('Alumni outcomes CSV has valid data', () => {
  const filePath = path.join(__dirname, 'mock_alumni_outcomes.csv');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.trim().split('\n');

  assert(lines.length > 1, 'CSV must have header and data rows');

  const header = lines[0].split(',');
  assert(header.includes('Major'), 'CSV missing Major column');
  assert(header.includes('Industry'), 'CSV missing Industry column');
  assert(header.includes('MedianSalary'), 'CSV missing MedianSalary column');
  assert(header.includes('TopSkills'), 'CSV missing TopSkills column');

  const dataRow = lines[1].split(',');
  assert(dataRow.length === header.length, 'Data row column count mismatch');
});

test('Job postings JSON file exists', () => {
  const filePath = path.join(__dirname, 'mock_job_postings.json');
  assert(fs.existsSync(filePath), 'mock_job_postings.json file not found');
});

test('Job postings JSON has valid structure', () => {
  const filePath = path.join(__dirname, 'mock_job_postings.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  assert(Array.isArray(data), 'Job postings must be an array');
  assert(data.length > 0, 'Must have at least one job posting');

  data.forEach((job, index) => {
    assert(job.title, `Job ${index} missing title`);
    assert(job.company, `Job ${index} missing company`);
    assert(job.location, `Job ${index} missing location`);
    assert(Array.isArray(job.skills_required), `Job ${index} skills_required must be an array`);
  });
});

console.log('\n--- Gamification Module ---');

test('Badges JSON file exists', () => {
  const filePath = path.join(__dirname, 'mock_badges.json');
  assert(fs.existsSync(filePath), 'mock_badges.json file not found');
});

test('Badges JSON has valid structure', () => {
  const filePath = path.join(__dirname, 'mock_badges.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  assert(Array.isArray(data), 'Badges must be an array');
  assert(data.length === 3, 'Expected exactly 3 badges');

  data.forEach((badge, index) => {
    assert(badge.id, `Badge ${index} missing id`);
    assert(badge.name, `Badge ${index} missing name`);
    assert(badge.description, `Badge ${index} missing description`);
    assert(typeof badge.earned === 'boolean', `Badge ${index} earned must be boolean`);
  });
});

test('Badge IDs match expected format', () => {
  const filePath = path.join(__dirname, 'mock_badges.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  const expectedIds = ['badge_resume_upload', 'badge_alumni_paths', 'badge_skill_builder'];
  const actualIds = data.map(b => b.id);

  expectedIds.forEach(id => {
    assert(actualIds.includes(id), `Missing expected badge ID: ${id}`);
  });
});

test('Badge initial states are correct', () => {
  const filePath = path.join(__dirname, 'mock_badges.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  const resumeBadge = data.find(b => b.id === 'badge_resume_upload');
  assert(resumeBadge.earned === true, 'Resume Explorer badge should be earned initially');

  const alumniConnect = data.find(b => b.id === 'badge_alumni_paths');
  assert(alumniConnect.earned === false, 'Alumni Connector badge should be locked initially');

  const skillBuilder = data.find(b => b.id === 'badge_skill_builder');
  assert(skillBuilder.earned === false, 'Skill Builder badge should be locked initially');
});

console.log('\n--- Dashboard Module ---');

test('Dashboard metrics JSON file exists', () => {
  const filePath = path.join(__dirname, 'mock_dashboard_metrics.json');
  assert(fs.existsSync(filePath), 'mock_dashboard_metrics.json file not found');
});

test('Dashboard metrics JSON has valid structure', () => {
  const filePath = path.join(__dirname, 'mock_dashboard_metrics.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  assert(typeof data.total_resumes_uploaded === 'number', 'total_resumes_uploaded must be a number');
  assert(data.total_resumes_uploaded > 0, 'total_resumes_uploaded must be greater than 0');

  assert(Array.isArray(data.top_skills), 'top_skills must be an array');
  assert(data.top_skills.length > 0, 'top_skills must have at least one skill');

  assert(typeof data.badges_earned === 'object', 'badges_earned must be an object');
  assert(Object.keys(data.badges_earned).length > 0, 'badges_earned must have at least one entry');

  assert(Array.isArray(data.popular_queries), 'popular_queries must be an array');
  assert(data.popular_queries.length > 0, 'popular_queries must have at least one query');
});

test('Dashboard badge counts are valid', () => {
  const filePath = path.join(__dirname, 'mock_dashboard_metrics.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  Object.entries(data.badges_earned).forEach(([badgeName, count]) => {
    assert(typeof count === 'number', `Badge ${badgeName} count must be a number`);
    assert(count >= 0, `Badge ${badgeName} count must be non-negative`);
  });

  const expectedBadges = ['Resume Explorer', 'Alumni Connector', 'Skill Builder'];
  expectedBadges.forEach(badge => {
    assert(badge in data.badges_earned, `Missing expected badge in metrics: ${badge}`);
  });
});

test('Dashboard metrics data consistency', () => {
  const filePath = path.join(__dirname, 'mock_dashboard_metrics.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);

  const totalBadges = Object.values(data.badges_earned).reduce((sum, count) => sum + count, 0);
  assert(totalBadges > 0, 'Total badges must be greater than 0');
  assert(totalBadges <= data.total_resumes_uploaded * 3, 'Total badges should not exceed 3x resumes uploaded');
});

console.log('\n--- Service Integration Tests ---');

test('CSV parser utility exists', () => {
  const filePath = path.join(__dirname, 'src/utils/csvParser.ts');
  assert(fs.existsSync(filePath), 'csvParser.ts utility not found');
});

test('All service files exist', () => {
  const services = [
    'src/services/data.service.ts',
    'src/services/resume.service.ts',
    'src/services/badge.service.ts',
    'src/services/dashboard.service.ts'
  ];

  services.forEach(service => {
    const filePath = path.join(__dirname, service);
    assert(fs.existsSync(filePath), `Service file not found: ${service}`);
  });
});

test('All type definition files exist', () => {
  const types = [
    'src/types/alumni.types.ts',
    'src/types/badge.types.ts',
    'src/types/dashboard.types.ts',
    'src/types/resume.types.ts'
  ];

  types.forEach(type => {
    const filePath = path.join(__dirname, type);
    assert(fs.existsSync(filePath), `Type file not found: ${type}`);
  });
});

console.log('\n=== Test Summary ===\n');
console.log(`Total Tests: ${results.passed + results.failed}`);
console.log(`Passed: ${results.passed}`);
console.log(`Failed: ${results.failed}`);
console.log(`Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

if (results.failed > 0) {
  console.log('\n--- Failed Tests ---');
  results.tests.filter(t => t.status === 'FAIL').forEach(t => {
    console.log(`✗ ${t.name}: ${t.notes}`);
  });
  process.exit(1);
} else {
  console.log('\n✓ All tests passed! Ready for deployment.\n');
  process.exit(0);
}
