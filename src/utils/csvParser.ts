export interface ParsedCSV {
  headers: string[];
  rows: Record<string, string>[];
}

export const parseCSV = (csvText: string): ParsedCSV => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  const rows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    return row;
  });

  return { headers, rows };
};

export const parseSkillsString = (skillsString: string): string[] => {
  return skillsString.split(';').map(skill => skill.trim());
};
