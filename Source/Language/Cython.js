/*
---
description: Cython language

license: MIT-style

authors:
  - Devyn Collier Johnson

requires:
  - Core/1.4.5

provides: [EnlighterJS.Language.cython]
...
*/
EJS.Language.cython = new Class({
    
    Extends: EJS.Language.generic,
    
    setupLanguage: function()
    {
        this.keywords = {
            reserved:{
                csv:"__all__, and, del, from, not, while, as, ELIF, elif, global, or, with, assert, ELSE, else, IF, if, pass, yield, break, except, include, cimport, import, pyximport, cythonize, print, class, exec, in, raise, continue, finally, is, return, DEF, def, cdef, cpdef, for, lambda, try, ctypedef, property",
                alias:'kw1'
            },
            functions:{
                csv:"__dealloc__, __get__, __import__, __init__, abs, all, any, apply, bin, callable, chr, cmp, coerce, compile, delattr, dir, divmod, eval, execfile, filter, fopen, format, getattr, globals, hasattr, hash, hex, id, input, intern, isinstance, issubclass, iter, len, locals, map, max, min, next, oct, open, ord, pow, print, range, raw_input, reduce, reload, repr, round, setattr, sorted, sum, unichr, vars, zip",
                alias:'kw2'
            },
            classes:{
                csv:"ArithmeticError, AssertionError, AttributeError, BaseException, BufferError, BytesWarning, DeprecationWarning, EOFError, EnvironmentError, Exception, FloatingPointError, FutureWarning, GeneratorExit, IOError, ImportError, ImportWarning, IndentationError, IndexError, KeyError, KeyboardInterrupt, LookupError, MemoryError, NameError, NotImplementedError, OSError, OverflowError, PendingDeprecationWarning, PyErr_Fetch, PyErr_Occurred, PyErr_WarnEx, ReferenceError, RuntimeError, RuntimeWarning, StandardError, StopIteration, SyntaxError, SyntaxWarning, SystemError, SystemExit, TabError, TypeError, UnboundLocalError, UnicodeDecodeError, UnicodeEncodeError, UnicodeError, UnicodeTranslateError, UnicodeWarning, UserWarning, ValueError, Warning, ZeroDivisionError, basestring, bool, buffer, bytearray, bytes, char, classmethod, complex, dict, double, enumerate, extern, file, float, frozenset, int, list, long, namespace, object, property, public, reversed, set, slice, staticmethod, str, struct, super, tuple, type, void, unicode, union, unsigned, xrange",
                alias:'kw2'
            }
        },
        
        this.patterns = {
            'poundComments': {
                pattern: this.common.poundComments,
                alias:'co1'
            },
            /*
            'multiComments': {
                pattern: /^=begin[\s\S]*?^=end/gm,
                alias: 'co2'
            },*/
            'multiStringComments1': {
                pattern:  /"""[\s\S]*?"""/gm,
                alias: 'co2'
            },
            'multiStringComments2': {
                pattern:  /'''[\s\S]*?'''/gm,
                alias: 'co2'
            },
            'strings': {
                pattern: this.common.strings,
                alias: 'st0'
            },
            'tickStrings': {
                pattern: this.delimToRegExp("`","\\","`","gm"),
                alias: 'st0'
            },
            'delimString': {
                pattern: /(%[q|Q|x]?(\W)[^\2\\\n]*(?:\\.[^\2\\]*)*(\2|\)|\]|\}))/gm,
                alias: 'st1'
            },
            'heredoc': {
                pattern: /(<<(\'?)([A-Z0-9]+)\2[^\n]*?\n[\s\S]*\n\3(?![\w]))/gim,
                alias: 'st2'
            },
            'variables': {
                pattern: /(@[A-Za-z_][\w]*|@@[A-Za-z_][\w]*|\$(?:\-[\S]|[\w]+)|\b[A-Z][\w]*)/g,
                alias: 'kw3'
            },
            'rubySymbols': {
                pattern: /[^:](:[\w]+)/g,
                alias: 'kw4'
            },
            'constants': {
                pattern: /\b[A-Z][\w]*/g,
                alias: 'kw3'
            },
            'numbers': {
                pattern: /\b((([0-9]+)?\.)?[0-9_]+([e][-+]?[0-9]+)?|0x[A-F0-9]+|0b[0-1_]+)\b/gim,
                alias: 'nu0'
            },
            'properties': {
                pattern: this.common.properties,
                alias: 'me0'
            },
            'brackets': {
                pattern: this.common.brackets,
                alias: 'br0'
            },
            'delimRegex': {
                pattern: /(%r(\W)[^\2\\\n]*(?:\\.[^\2\\\n]*?)*(\2|\)|\]|\})[iomx]*)/gm,
                alias: 're0'
            },
            'literalRegex': {
                pattern: this.delimToRegExp("/","\\","/","g","[iomx]*"),
                alias: 're0'
            }
        };
          
    }
});