import test from 'node:test';
import assert from 'node:assert/strict';
import { majorityVote, getVoteStrength, detectEncryptedLikeData } from '../src/multiLayerVoting.js';

function createResult(success, message, confidence) {
    return { success, message, confidence };
}

test('majorityVote returns none when no layer decodes', () => {
    const result = majorityVote({
        lsb: createResult(false, '', 0),
        prism: createResult(false, '', 0),
        noise: createResult(false, '', 0)
    });

    assert.equal(result.final, null);
    assert.equal(result.method, 'none');
    assert.deepEqual(result.selectedLayers, []);
});

test('majorityVote returns unanimous 3/3 when all match', () => {
    const result = majorityVote({
        lsb: createResult(true, 'same', 80),
        prism: createResult(true, 'same', 70),
        noise: createResult(true, 'same', 75)
    });

    assert.equal(result.method, '3/3 unanimous');
    assert.equal(result.matches, 3);
    assert.equal(result.final, 'same');
});

test('majorityVote returns 2/3 majority when two layers match', () => {
    const result = majorityVote({
        lsb: createResult(true, 'alpha', 80),
        prism: createResult(true, 'beta', 90),
        noise: createResult(true, 'alpha', 60)
    });

    assert.equal(result.method, '2/3 majority');
    assert.equal(result.matches, 2);
    assert.equal(result.final, 'alpha');
    assert.deepEqual(result.selectedLayers, ['lsb', 'noise']);
});

test('majorityVote falls back to highest confidence on conflict', () => {
    const result = majorityVote({
        lsb: createResult(true, 'alpha', 40),
        prism: createResult(true, 'beta', 95),
        noise: createResult(true, 'gamma', 80)
    });

    assert.equal(result.method, 'conflict (highest confidence)');
    assert.equal(result.conflict, true);
    assert.equal(result.final, 'beta');
    assert.deepEqual(result.selectedLayers, ['prism']);
});

test('getVoteStrength maps voting outcomes to trust labels', () => {
    assert.equal(getVoteStrength({ final: null }).label, 'No result');
    assert.equal(getVoteStrength({ final: 'x', matches: 3 }).label, 'Strong');
    assert.equal(getVoteStrength({ final: 'x', matches: 2 }).label, 'Medium');
    assert.equal(getVoteStrength({ final: 'x', matches: 1, conflict: true }).label, 'Low');
});

test('detectEncryptedLikeData identifies base64 salt/iv/ciphertext shape', () => {
    const longBase64 = 'QmFzZTY0RGF0YUZvckFlc0djbVNhbHRJdkNpcGhlcnRleHQxMjM0NTY3ODkwQUJDREVGRw==';
    const encryptedLike = detectEncryptedLikeData(longBase64);
    assert.equal(encryptedLike.encryptedLike, true);

    assert.equal(detectEncryptedLikeData('short').encryptedLike, false);
    assert.equal(detectEncryptedLikeData('this-is-definitely-not-base64-characters-@@@@').reason, 'not_base64');
});
