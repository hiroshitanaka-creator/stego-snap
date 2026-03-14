export function majorityVote(results) {
    const messages = [];

    for (const [layer, result] of Object.entries(results)) {
        if (result.success && result.message) {
            messages.push({ layer, message: result.message, confidence: result.confidence });
        }
    }

    if (messages.length === 0) {
        return { final: null, method: 'none', matches: 0, selectedLayers: [] };
    }

    if (messages.length === 1) {
        return {
            final: messages[0].message,
            method: 'single',
            matches: 1,
            selectedLayers: [messages[0].layer]
        };
    }

    const m0 = messages[0]?.message;
    const m1 = messages[1]?.message;
    const m2 = messages[2]?.message;

    if (m0 === m1 && m1 === m2 && m0) {
        return {
            final: m0,
            method: '3/3 unanimous',
            matches: 3,
            selectedLayers: messages.map((m) => m.layer)
        };
    }

    if (m0 === m1 && m0) {
        return {
            final: m0,
            method: '2/3 majority',
            matches: 2,
            selectedLayers: [messages[0].layer, messages[1].layer]
        };
    }

    if (m0 === m2 && m0) {
        return {
            final: m0,
            method: '2/3 majority',
            matches: 2,
            selectedLayers: [messages[0].layer, messages[2].layer]
        };
    }

    if (m1 === m2 && m1) {
        return {
            final: m1,
            method: '2/3 majority',
            matches: 2,
            selectedLayers: [messages[1].layer, messages[2].layer]
        };
    }

    messages.sort((a, b) => b.confidence - a.confidence);
    return {
        final: messages[0].message,
        method: 'conflict (highest confidence)',
        matches: 1,
        conflict: true,
        selectedLayers: [messages[0].layer]
    };
}

export function getVoteStrength(votingResult) {
    if (!votingResult.final) return { label: 'No result', className: 'fail', hint: 'No valid frame was detected in any layer.' };
    if (votingResult.matches === 3) return { label: 'Strong', className: 'match', hint: 'All decoded layers agreed on the same message.' };
    if (votingResult.matches === 2) return { label: 'Medium', className: 'success', hint: 'Two layers matched, which is usually reliable.' };
    if (votingResult.conflict) return { label: 'Low', className: 'fail', hint: 'Layer outputs conflicted. Verify with sender before trusting this result.' };
    return { label: 'Low', className: 'warning', hint: 'Only one layer was decoded. Treat as unverified output.' };
}

export function detectEncryptedLikeData(text) {
    if (!text || text.length < 28) return { encryptedLike: false, reason: 'too_short' };

    const base64Pattern = /^[A-Za-z0-9+/=]+$/;
    if (!base64Pattern.test(text)) return { encryptedLike: false, reason: 'not_base64' };

    const normalized = text.replace(/=+$/, '');
    if (normalized.length < 56) return { encryptedLike: false, reason: 'base64_but_short' };

    return { encryptedLike: true, reason: 'salt_iv_ciphertext_shape' };
}
