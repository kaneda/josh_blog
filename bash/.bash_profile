export PS1='\[\033[01;31m\]\u\[\033[01;33m\]@\[\033[01;36m\]\h \[\033[01;33m\]\w \[\033[01;35m\]\$ \[\033[00m\]'

alias ls='ls --color=auto'
alias l='ls -l --color=auto'
alias ll='ls -al --color=auto'

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*

rvm use ruby-2.1.2
