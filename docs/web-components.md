---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
direct_url: https://github.com/cpamp/blynx/tree/master/packages/web-components
permalink: web-components/
---

# @blynx/web-components

{% for component in site.web-components %}
<div>
    <a href="{{ site.baseurl }}{{ component.url }}">{{ component.title }}</a> - {{ component.short_description }}
</div>
{% endfor %}