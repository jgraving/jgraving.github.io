# CV sources

The website links to `../jacob_graving_cv.pdf`, built from
`jacob_graving_cv_short.tex`. Edit that LaTeX source to update the public CV.
`jacob_graving_cv_short_industry.tex` remains the separate industry variant.
The older full academic CV is independent.

Both short sources use `cv-theme.sty` for typography and spacing. Compile with
XeLaTeX from this directory (TeX Live or Overleaf):

```sh
xelatex jacob_graving_cv_short.tex
xelatex jacob_graving_cv_short.tex
cp jacob_graving_cv_short.pdf ../jacob_graving_cv.pdf
```

The theme uses Avenir Next when installed, otherwise Carlito, otherwise TeX Gyre
Heros. The distributed PDF embeds Carlito, an open humanist sans-serif under the
SIL Open Font License. Fonts are embedded for predictable display and selectable,
searchable text. The layout uses a single column and ordinary LaTeX headings and
lists. It is not a certification of any particular applicant-tracking system or
PDF/UA conformance.

The missing public short-CV source was restored from the published PDF in October
2026. Publication statuses and wording were preserved; check them separately when
making a content update.
