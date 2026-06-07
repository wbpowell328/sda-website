# Compatibility shims for running github-pages' pinned Jekyll 3.9 + Liquid 4.0
# on Ruby 4.0, which removed the long-deprecated tainted?/untaint/taint methods.
#
# Jekyll plugins in _plugins/ only load during local `jekyll serve` — GitHub
# Pages ignores them in its sandboxed build, so this has no effect on production.

puts "[ruby4_compat] loading compatibility shims for Ruby 4.x + Liquid 4"

# Belt-and-suspenders Object patch
class Object
  def tainted?; false; end
  def untaint;  self;  end
  def taint;    self;  end
end

# Targeted Liquid patch: the taint check is the only place that breaks.
# In Ruby 4.x, the whole taint system is gone, so the check is meaningless.
require 'liquid'
module Liquid
  class Variable
    def taint_check(_context, _obj); end
  end
end
