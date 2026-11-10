import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ANTIGRAVITY_CONFIG_DIRECTORY, CLAUDE_DIRECTORY, COMMAND_VALIDATOR_ADAPTER_FILE } from "./constants";
import { writeGeneratedFile } from "./generated_manifest";

const ANTIGRAVITY_HOOKS_FILE = join(ANTIGRAVITY_CONFIG_DIRECTORY, "hooks.json");
const BUN_EXECUTABLE = Bun.which("bun") ?? "bun";
const FINISH_SOUND_FILE = join(CLAUDE_DIRECTORY, "song/finish.mp3");

// Only portable hooks are synced. ECC session/cost hooks depend on the Claude Code transcript format,
// and Antigravity has no Notification or PreCompact events.
// A hook is registered only when the file it runs exists, so a fresh install gets no broken hook.
const COMMAND_VALIDATOR_FILE = join(CLAUDE_DIRECTORY, "scripts/command-validator/src/cli.ts");

const COMMAND_VALIDATOR_HOOK = {
	"claude-command-validator": {
		PreToolUse: [
			{
				matcher: "run_command",
				hooks: [
					{
						type: "command",
						command: `${BUN_EXECUTABLE} ${COMMAND_VALIDATOR_ADAPTER_FILE}`,
						timeout: 15,
					},
				],
			},
		],
	},
};

const FINISH_SOUND_HOOK = {
	"claude-finish-sound": {
		Stop: [
			{
				type: "command",
				command: `(afplay -v 0.1 ${FINISH_SOUND_FILE} >/dev/null 2>&1 &); echo '{}'`,
				timeout: 5,
			},
		],
	},
};

function selectSyncedHooks() {
	return {
		...(existsSync(COMMAND_VALIDATOR_FILE) ? COMMAND_VALIDATOR_HOOK : {}),
		...(process.platform === "darwin" && existsSync(FINISH_SOUND_FILE) ? FINISH_SOUND_HOOK : {}),
	};
}

export function syncHooks(): string[] {
	const syncedHooks = selectSyncedHooks();
	const existingHooks = existsSync(ANTIGRAVITY_HOOKS_FILE)
		? JSON.parse(readFileSync(ANTIGRAVITY_HOOKS_FILE, "utf8") || "{}")
		: {};
	const mergedHooks = { ...existingHooks, ...syncedHooks };
	writeGeneratedFile(ANTIGRAVITY_HOOKS_FILE, `${JSON.stringify(mergedHooks, null, 2)}\n`);
	console.log(`hooks: ${Object.keys(syncedHooks).join(", ") || "none"} -> ${ANTIGRAVITY_HOOKS_FILE}`);
	return [];
}
