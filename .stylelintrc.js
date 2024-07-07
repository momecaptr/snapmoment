module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  rules: {
    'no-descending-specificity': null,
    'custom-property-pattern': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes']
      }
    ],
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    'keyframes-name-pattern': null
  }
};
