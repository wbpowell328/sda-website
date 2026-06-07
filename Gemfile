source "https://rubygems.org"

# Use the github-pages meta-gem to match GitHub's build environment exactly.
gem "github-pages", group: :jekyll_plugins

# Plugins enabled in _config.yml
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Stdlib gems that Ruby 3.4+/4.0 removed from defaults but Jekyll 3.9 still expects.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
gem "webrick"

# Windows-specific gems needed if Jekyll ever runs locally on Windows.
# wdm (Windows Directory Monitor) is deprecated and breaks on Ruby 3.x;
# use `jekyll serve --force_polling` if file-watching ever stops working.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
