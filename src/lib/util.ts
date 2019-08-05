import { resolve, relative, join, dirname } from 'path';
import { promises } from 'fs';

// https://2ality.com/2015/01/template-strings-html.html
export function html(literalSections: TemplateStringsArray, ...substs: any[]) {
  // Use raw literal sections: we don’t want
  // backslashes (\n etc.) to be interpreted
  const raw = literalSections.raw;

  let result = '';

  substs.forEach((subst, i) => {
    // Retrieve the literal section preceding
    // the current substitution
    let lit = raw[i];

    // In the example, map() returns an array:
    // If substitution is an array (and not a string),
    // we turn it into a string
    if (Array.isArray(subst)) {
      subst = subst.join('');
    }

    // If the substitution is preceded by a dollar sign,
    // we escape special characters in it
    if (lit.endsWith('$')) {
      subst = htmlEscape(subst);
      lit = lit.slice(0, -1);
    }
    result += lit;
    result += subst;
  });
  // Take care of last literal section
  // (Never fails, because an empty template string
  // produces one literal section, an empty string)
  result += raw[raw.length - 1]; // (A)

  return result.trim();
}

function htmlEscape(str: string) {
  return str
    .replace(/&/g, '&amp;') // first!
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}

/**
 * Gets all files recursively in a folder
 *
 * @param dir the path to search
 */
export async function* getFiles(dir: string): AsyncIterable<string> {
  const dirents = await promises.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

export async function copyFiles(dir: string, outdir: string) {
  const files = getFiles(dir);
  for await (let f of files) {
    const rel = relative(dir, f);
    const path = resolve(join(outdir, rel));
    const rdir = dirname(path);
    await createDir(rdir);
    await promises.copyFile(f, path);
  }
}

export async function createDir(dir: string) {
  await promises.mkdir(dir, { recursive: true });
}

export function formatDate(date: Date) {
  return date.getFullYear() + '.' + padNumber(date.getMonth() + 1) + '.' + padNumber(date.getDay());
}

export function padNumber(num: number) {
  if (num <= 9) {
    return '0' + num;
  }
  return '' + num;
}
