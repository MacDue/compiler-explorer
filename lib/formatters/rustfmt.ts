// Copyright (c) 2021, Compiler Explorer Authors
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import type {UnprocessedExecResult} from '../../types/execution/execution.interfaces.js';
import * as exec from '../exec.js';

import {BaseFormatter} from './base.js';
import type {FormatOptions} from './base.interfaces.js';

export class RustFmtFormatter extends BaseFormatter {
    static get key() {
        return 'rustfmt';
    }

    override async format(source: string, options: FormatOptions): Promise<UnprocessedExecResult> {
        const args = [
            '--emit',
            'stdout',
            '--config',
            `hard_tabs=${options.useSpaces ? 'false' : 'true'}`,
            '--config',
            `tab_spaces=${options.tabWidth}`,
            // Force edition 2021 to support most modern syntax features
            '--edition 2021',
        ];
        return await exec.execute(this.formatterInfo.exe, args, {input: source});
    }

    /**
     * Rust format only has one style.
     */
    override isValidStyle(style: string): boolean {
        return true;
    }
}
