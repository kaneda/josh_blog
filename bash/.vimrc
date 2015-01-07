syntax on
map <Leader>c :w !ruby -c<cr>
set smartindent
set tabstop=2
set shiftwidth=2
set expandtab
highlight OverLength ctermbg=red ctermfg=white guibg=#592929
match OverLength /\%120v.\+/
