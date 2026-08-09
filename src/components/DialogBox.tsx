import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    Link,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

// ---- design tokens -------------------------------------------------------
// Numbers are the payoff of this report, so they get a monospace face and
// a lot of size. Everything else stays quiet so the scores read first.

const INK = '#14181F';
const PAPER = '#FCFBF9';
const LINE = '#E6E2DA';
const MUTED = '#6B6558';

const scoreColor = (score: number) => {
    if (score >= 80) return '#1F8A55'; // strong
    if (score >= 60) return '#B8830A'; // moderate
    return '#C4432B'; // weak
};

const scoreLabel = (score: number) => {
    if (score >= 80) return 'Strong match';
    if (score >= 60) return 'Moderate match';
    return 'Weak match';
};

// ---- small building blocks ------------------------------------------------

function ScoreDial({ value, label, sublabel }: { value: number; label: string; sublabel?: string }) {
    const color = scoreColor(value);
    const size = 132;
    const stroke = 6;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{ position: 'relative', width: size, height: size }}>
                <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={LINE} strokeWidth={stroke} />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={r}
                        fill="none"
                        stroke={color}
                        strokeWidth={stroke}
                        strokeDasharray={c}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                    />
                </svg>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
                            fontWeight: 600,
                            fontSize: 34,
                            lineHeight: 1,
                            color: INK,
                        }}
                    >
                        {Math.round(value)}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: MUTED, mt: 0.3 }}>/ 100</Typography>
                </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: INK, letterSpacing: 0.2 }}>
                    {label}
                </Typography>
                {sublabel && (
                    <Typography sx={{ fontSize: 12, color, fontWeight: 600 }}>{sublabel}</Typography>
                )}
            </Box>
        </Box>
    );
}

// Items may later come back as plain strings, or as { text, url } once
// hyperlinked sources exist. Handle both without changing the data shape.
function normalizeItem(item: string | { text?: string; label?: string; url?: string }) {
    if (typeof item === 'string') return { text: item, url: null };
    if (item && typeof item === 'object') return { text: item.text ?? item.label ?? '', url: item.url ?? null };
    return { text: String(item ?? ''), url: null };
}

function TagList({ items, tone = 'neutral' }: { items: (string | { text?: string; label?: string; url?: string })[]; tone?: 'positive' | 'negative' | 'neutral' }) {
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <Typography sx={{ fontSize: 13, color: MUTED, fontStyle: 'italic' }}>None noted</Typography>
        );
    }

    const border = tone === 'positive' ? '#CDE4D6' : tone === 'negative' ? '#F0D3CC' : LINE;
    const bg = tone === 'positive' ? '#F4FAF6' : tone === 'negative' ? '#FDF6F4' : '#FFFFFF';

    return (
        <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {items.map((raw, i) => {
                const { text, url } = normalizeItem(raw);
                return (
                    <Chip
                        key={`${text}-${i}`}
                        size="small"
                        clickable={!!url}
                        component={url ? Link : 'div'}
                        href={url || undefined}
                        target={url ? '_blank' : undefined}
                        rel={url ? 'noopener noreferrer' : undefined}
                        icon={url ? <ArrowOutwardIcon sx={{ fontSize: 13 }} /> : undefined}
                        label={text}
                        sx={{
                            border: `1px solid ${border}`,
                            backgroundColor: bg,
                            color: INK,
                            fontSize: 12.5,
                            height: 26,
                            '&:hover': url ? { backgroundColor: '#FFF' } : undefined,
                        }}
                    />
                );
            })}
        </Stack>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Box sx={{ mb: 2.25 }}>
            <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: MUTED, letterSpacing: 0.6, mb: 0.75, textTransform: 'uppercase' }}>
                {title}
            </Typography>
            {children}
        </Box>
    );
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DialogBox({ open, onClose, data }: { open: boolean; onClose: () => void; data: any }) {
    const isMobile = useMediaQuery('(max-width:640px)');

    const analysisData = data?.data && typeof data.data === 'object' ? data.data : data || {};

    const summary = analysisData?.summary ?? '';
    const matchingScore = Math.min(100, Math.max(0, Number(analysisData?.matching_score ?? 0)));
    const atsScore = Math.min(100, Math.max(0, Number(analysisData?.resume_ats_score ?? 0)));
    const matching = analysisData?.matching ?? {};
    const missing = analysisData?.missing ?? {};
    const rewrites = analysisData?.points_needs_to_be_replace_and_added_in_the_resume ?? [];
    const notes = analysisData?.note_of_improvement ?? [];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            PaperProps={{ sx: { backgroundColor: PAPER } }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: { xs: 2, sm: 4 },
                    py: 2,
                    borderBottom: `1px solid ${LINE}`,
                    backgroundColor: PAPER,
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                }}
            >
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: INK }}>
                    Analysis report
                </Typography>
                <IconButton onClick={onClose} size="small" aria-label="Close" sx={{ color: INK }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 0 }}>
                <Box sx={{ maxWidth: 880, mx: 'auto', px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 5 } }}>

                    {/* Scores — the payoff, shown first */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: 3, sm: 6 },
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            backgroundColor: '#FFFFFF',
                            border: `1px solid ${LINE}`,
                            borderRadius: 2,
                            py: 4,
                            mb: 4,
                        }}
                    >
                        <ScoreDial value={matchingScore} label="Profile Match score" sublabel={scoreLabel(matchingScore)} />
                        <ScoreDial value={atsScore} label="Resume ATS score" sublabel={scoreLabel(atsScore)} />
                    </Box>

                    {/* Summary */}
                    {summary && (
                        <Box sx={{ mb: 4 }}>
                            <Typography sx={{ fontSize: 15, lineHeight: 1.7, color: INK }}>
                                {summary}
                            </Typography>
                        </Box>
                    )}

                    {/* Matching / Missing — side by side on desktop, stacked on mobile */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr',
                            gap: { xs: 3, sm: 4 },
                            mb: 1,
                        }}
                    >
                        <Box>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1F8A55', mb: 2 }}>
                                What matches
                            </Typography>
                            {matching.skills?.length > 0 && (
                                <Section title="Skills"><TagList items={matching.skills} tone="positive" /></Section>
                            )}
                            {matching.experience?.length > 0 && (
                                <Section title="Experience"><TagList items={matching.experience} tone="positive" /></Section>
                            )}
                            {matching.qualifications?.length > 0 && (
                                <Section title="Qualifications"><TagList items={matching.qualifications} tone="positive" /></Section>
                            )}
                            {matching.other?.length > 0 && (
                                <Section title="Other"><TagList items={matching.other} tone="positive" /></Section>
                            )}
                        </Box>

                        <Box>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#C4432B', mb: 2 }}>
                                Gaps
                            </Typography>
                            {missing.skills?.length > 0 && (
                                <Section title="Skills"><TagList items={missing.skills} tone="negative" /></Section>
                            )}
                            {missing.experience?.length > 0 && (
                                <Section title="Experience"><TagList items={missing.experience} tone="negative" /></Section>
                            )}
                            {missing.qualifications?.length > 0 && (
                                <Section title="Qualifications"><TagList items={missing.qualifications} tone="negative" /></Section>
                            )}
                            {missing.other?.length > 0 && (
                                <Section title="Other"><TagList items={missing.other} tone="negative" /></Section>
                            )}
                        </Box>
                    </Box>

                    {/* Rewrite suggestions */}
                    {rewrites.length > 0 && (
                        <Box sx={{ mt: 5 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: INK, mb: 2 }}>
                                Suggested resume edits
                            </Typography>
                            <Stack gap={1.5}>
                                {rewrites.map((r: { replace: string; add: string }, i: number) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            border: `1px solid ${LINE}`,
                                            borderRadius: 1.5,
                                            backgroundColor: '#FFFFFF',
                                            p: 2,
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 13, color: '#C4432B', mb: 0.75, textDecoration: 'line-through', textDecorationColor: '#E3B3A8' }}>
                                            {r.replace}
                                        </Typography>
                                        <Typography sx={{ fontSize: 13, color: '#1F8A55' }}>
                                            {r.add}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}

                    {/* Notes */}
                    {notes.length > 0 && (
                        <Box sx={{ mt: 5, mb: 3 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: INK, mb: 1.5 }}>
                                Notes for improvement
                            </Typography>
                            <Stack gap={1}>
                                {notes.map((n: string, i: number) => (
                                    <Box key={i} sx={{ display: 'flex', gap: 1.25 }}>
                                        <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: MUTED, mt: '9px', flexShrink: 0 }} />
                                        <Typography sx={{ fontSize: 13.5, lineHeight: 1.6, color: INK }}>{n}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Box>
            </DialogContent>

            <Divider sx={{ borderColor: LINE }} />

            <Box sx={{ px: { xs: 2, sm: 4 }, py: 1.5, display: 'flex', justifyContent: 'flex-end', backgroundColor: PAPER }}>
                <Button onClick={onClose} variant="contained" disableElevation sx={{ backgroundColor: INK, '&:hover': { backgroundColor: '#000' } }}>
                    Close
                </Button>
            </Box>
        </Dialog>
    );
}