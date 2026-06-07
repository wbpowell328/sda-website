# Compatibility shim for running Jekyll 3.9 + Liquid 4.0 (pinned by github-pages)
# on Ruby 4.x, which removed the long-deprecated taint system. Loaded via
# RUBYOPT so it applies before any gem requires.
#
# Has zero effect on production GitHub Pages builds — those run on their own
# sandboxed Ruby version with this file ignored.

class Object
  def tainted?; false; end
  def untaint;  self;  end
  def taint;    self;  end
end
